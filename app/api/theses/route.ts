import { createThesis } from "@/lib/mongodb/queries";
import { ThesisRequest } from "@/types";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const thesis: ThesisRequest = await request.json();

  const results = await createThesis(thesis);

  return Response.json(results);
}
