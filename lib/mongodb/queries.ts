import { Db, Document, ObjectId } from "mongodb";
import clientPromise from "./client";
import { Thesis, ThesisRequest } from "@/types";

export async function getDatabase(): Promise<Db> {
  const client = await clientPromise;
  return client.db("binas");
}

export async function findTheses(): Promise<Thesis[]> {
  const db = await getDatabase();
  const collection = db.collection<Thesis>("theses");

  const theses = collection.find<Thesis>({}).toArray();
  return theses;
}

export async function findThesisById(id: string): Promise<Thesis | null> {
  const db = await getDatabase();
  const collection = db.collection<Thesis>("theses");

  const theses = await collection.findOne<Thesis>({ _id: new ObjectId(id) });
  return theses;
}

export async function updateThesisById(
  id: string,
  thesisRequest: ThesisRequest
) {
  const db = await getDatabase();
  const collection = db.collection<Thesis>("theses");

  const theses = await collection.updateOne(
    { _id: new ObjectId(id) },
    {
      $set: thesisRequest,
    }
  );

  return theses.upsertedId;
}

export async function searchTheses(term?: string) {
  const db = await getDatabase();
  const collection = db.collection<Thesis>("theses");

  const pipeline: Document[] = [
    {
      $search: {
        index: "thesis-index",
        text: {
          query: term || "*",
          path: "title",
        },
      },
    },
  ];

  const thesesCursor = collection.aggregate<Thesis>(pipeline);
  const theses = await thesesCursor.toArray();
  return theses;
}

export async function createThesis(thesisRequest: ThesisRequest) {
  const db = await getDatabase();
  const collection = db.collection<Thesis>("theses");

  const result = await collection.insertOne(thesisRequest);
  return result.insertedId;
}
