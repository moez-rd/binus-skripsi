import { insertThesis, ThesisProps } from "@/lib/firebase/queries";
import { useRouter } from "next/router";
import { NextRequest } from "next/server";

export async function UPDATE(request: NextRequest) {
  const thesis: ThesisProps = await request.json();
  const router = useRouter();

  console.log(router.query.id);

  console.log(thesis);

  const results = await insertThesis(thesis);

  return Response.json(results);
}
