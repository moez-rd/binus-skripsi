import { insertThesis, ThesisProps } from "@/lib/firebase/queries";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const thesis: ThesisProps = await request.json();

  console.log("hehe");

  const results = await insertThesis(thesis);

  return Response.json(results);
}
