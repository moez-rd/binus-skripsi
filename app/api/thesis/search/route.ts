import { NextRequest, NextResponse } from "next/server";
import { searchThesis } from "@/lib/mongodb/thesis";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { query } = await body;
  const results = await searchThesis(query);
  return Response.json(results);
}
 