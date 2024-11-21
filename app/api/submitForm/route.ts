import { NextResponse } from "next/server";
import { connectToDatabase } from "../../lib/mongodb";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const client = await connectToDatabase();
    const db = client.db("codethon");
    const collection = db.collection("users");

    const result = await collection.insertOne(body);
    return NextResponse.json({ message: "Form data saved successfully!", result });
  } catch (error) {
    console.error("Error saving form data:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
