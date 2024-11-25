import {redirect} from "next/navigation";
import Admin from "@/components/organisms/admin";
import {cookies} from "next/headers";

export default function AdminPage() {
    const session = cookies().get('user-session')
    
    if (session?.value !== process.env.NEXT_PUBLIC_SESSION) {
        redirect("/login")
    }

    return <Admin/>

}