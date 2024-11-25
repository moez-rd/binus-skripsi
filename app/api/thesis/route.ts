import {NextRequest} from "next/server";
import {insertThesis, searchThesis, ThesisProps} from "@/lib/mongodb/thesis";

export async function POST(request: NextRequest) {
    const thesis: ThesisProps = await request.json()

    const results = await insertThesis(thesis);

    return Response.json(results)
}
