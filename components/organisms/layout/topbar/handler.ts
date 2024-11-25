import React from "react";
import {deleteCookie, setCookie} from "cookies-next";
import {useRouter} from "next/navigation";

export default function useHandler() {
    const router = useRouter()
    const handleLogoutClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()

        deleteCookie('user-session')

        router.refresh()
    };

    return {handleLogoutClick}

}