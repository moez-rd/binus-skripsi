import { findThesisById, updateThesisById } from "@/lib/mongodb/queries";
import { ThesisRequest } from "@/types";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const thesis = await findThesisById(params.id);
  return Response.json(thesis);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const thesis: ThesisRequest = await request.json();

  const results = await updateThesisById(params.id, thesis);

  return Response.json(results);
}
