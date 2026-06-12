import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/terrasync';
const options = {};

let client: MongoClient | null = null;
let clientPromise: Promise<MongoClient> | null = null;

export async function getMongoClient(): Promise<MongoClient> {
  if (client) return client;

  // Lazily connect inside request context to prevent Unhandled Promise Rejections at module load
  if (!clientPromise) {
    const mongoClient = new MongoClient(uri, options);
    clientPromise = mongoClient.connect().then((connectedClient) => {
      client = connectedClient;
      return connectedClient;
    });
  }

  return clientPromise;
}
