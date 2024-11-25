import React, {useState} from "react";
import {User} from "@/types/user";
import {useRouter} from "next/navigation";
import {setCookie} from "cookies-next";

export default function useHandler() {
    const [user, setUser] = useState<User>({
        username: "",
        password: ""
    });

    const router = useRouter()

    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>("")

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const {name, value} = event.target;
        setUser((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        setLoading(true);

        const username: string = process.env.NEXT_PUBLIC_USERNAME || ""
        const password: string = process.env.NEXT_PUBLIC_PASSWORD || ""
        const session: string = process.env.NEXT_PUBLIC_SESSION || ""

        if (!(user.username === username && user.password === password)) {
            setError("Username atau password salah")
            setUser({
                username: "",
                password: ""
            })
            setLoading(false)
            return
        }

        setCookie("user-session", session, {maxAge: 60 * 60 * 24 * 30})

        setLoading(false);

        // redirect('/admin')
        router.refresh()

        return

    };

    return {handleInputChange, handleSubmit, loading, error, user}
}