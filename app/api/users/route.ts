import { login } from "@/lib/login";
import { User } from "@/types/user";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const user: User = await request.json();

  const results = await login(user);

  return Response.json(results);
}
