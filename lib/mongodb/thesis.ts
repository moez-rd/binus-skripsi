import clientPromise from "@/lib/mongodb/mongodb";
import { WithId, Document, InsertOneResult } from "mongodb";

export interface ThesisProps {
  studentName: string;
  title: string;
  year: number;
  abstract: string;
}

export async function insertThesis(
  thesis: ThesisProps
): Promise<InsertOneResult<Document>> {
  const client = await clientPromise;
  const collection = client.db("theses_repo").collection("theses");
  return await collection.insertOne(thesis);
}

export async function searchThesis(query: string): Promise<WithId<Document>[]> {
  const client = await clientPromise;
  const collection = client.db("theses_repo").collection("theses");
  const result = await collection.find({ $text: { $search: query } }).toArray();
  return result;
}
