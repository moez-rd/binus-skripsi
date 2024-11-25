import React, { useState } from "react";
import { User } from "@/types/user";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
import axios from "axios";

export default function useHandler() {
  const [user, setUser] = useState<User>({
    username: "",
    password: "",
  });

  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleInputChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;
    setUser((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);

    const { data }: { data: { isFailed: boolean; session: string } } =
      await axios.post(`${process.env.NEXT_PUBLIC_APP_URL}/api/users`, {
        username: user.username,
        password: user.password,
      });

    console.log(data);

    if (data.isFailed) {
      setError("Username atau password salah");
      setUser({
        username: "",
        password: "",
      });
      setLoading(false);
      return;
    }

    setCookie("user-session", data.session, { maxAge: 60 * 60 * 24 * 30 });

    setLoading(false);

    // redirect('/admin')
    router.refresh();

    return;
  };

  return { handleInputChange, handleSubmit, loading, error, user };
}
