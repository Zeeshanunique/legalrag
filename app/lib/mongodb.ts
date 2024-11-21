import { MongoClient, ServerApiVersion } from "mongodb";

const MONGO_URI = process.env.MONGO_URI || ""; // Load URI from .env.local
if (!MONGO_URI) {
  throw new Error("Please define the MONGO_URI environment variable in .env.local");
}

// Create a MongoClient
const client = new MongoClient(MONGO_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let mongoClient: MongoClient | null = null;

// Function to connect to MongoDB
export async function connectToDatabase() {
  if (!mongoClient) {
    try {
      await client.connect();
      console.log("Connected to MongoDB successfully.");
      mongoClient = client;
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
      throw error;
    }
  }
  return mongoClient;
}
