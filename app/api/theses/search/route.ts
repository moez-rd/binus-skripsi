import { searchThesis } from "@/lib/firebase/queries";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { query } = await body;
  const results = await searchThesis(query);
  return Response.json(results);
}
