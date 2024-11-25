import React from "react";
import {redirect} from "next/navigation";
import Login from "@/components/organisms/login";
import {cookies} from "next/headers";

export default function LoginPage() {
    const session = cookies().get('user-session')

    if (session?.value == process.env.NEXT_PUBLIC_SESSION) {
        redirect("/admin")
    }

    return <Login/>
}