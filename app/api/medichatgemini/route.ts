import { queryPineconeVectorStore } from "@/utils";
import { Pinecone } from "@pinecone-database/pinecone";
import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
// import { Message, OpenAIStream, StreamData, StreamingTextResponse } from "ai";
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateText, Message, StreamData, streamText } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 60;
// export const runtime = 'edge';

const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY ?? "",
});

const google = createGoogleGenerativeAI({
    baseURL: 'https://generativelanguage.googleapis.com/v1beta',
    apiKey: process.env.GEMINI_API_KEY
});

// gemini-1.5-pro-latest
// gemini-1.5-pro-exp-0801
const model = google('models/gemini-1.5-flash', {
    safetySettings: [
        { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' }
    ],
});

// const model = genAI.getGenerativeModel({
//     model: "gemini-1.5-flash",
// });

export async function POST(req: Request, res: Response) {
    const reqBody = await req.json();
    console.log(reqBody);

    const messages: Message[] = reqBody.messages;
    const userQuestion = `${messages[messages.length - 1].content}`;

    const reportData: string = reqBody.data.reportData;
    const query = `Represent this for searching relevant passages: legal document states: \n${reportData}. \n\n${userQuestion}`;

    const retrievals = await queryPineconeVectorStore(pinecone, 'index-two', "legalspace", query);

    const finalPrompt = `Here is a summary of a legal document, and a user query. Some general legal principles are also provided that may or may not be relevant to the document.
    Go through the legal document and answer the user's query.
    Ensure the response is factually accurate and demonstrates a thorough understanding of the query topic and the legal document.
    Before answering, you may enrich your knowledge by going through the provided legal principles.
    The legal principles are general insights and not necessarily part of the specific legal document. Do not include any legal principle if it is not relevant to the user's case.

    \n\n**Legal Document Summary:** \n${reportData}. 
    \n**end of legal document** 

    \n\n**User Query:**\n${userQuestion}?
    \n**end of user query** 

    \n\n**General Legal Principles:**
    \n\n${retrievals}. 
    \n\n**end of general legal principles** 

    \n\nProvide thorough justification for your answer.
    \n\n**Answer:**
    `;

    const data = new StreamData();
    data.append({
        retrievals: retrievals
    });

    const result = await streamText({
        model: model,
        prompt: finalPrompt,
        onFinish() {
            data.close();
        }
    });

    return result.toDataStreamResponse({ data });
}
