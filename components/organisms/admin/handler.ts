import React, {useState} from "react";
import {ThesisProps} from "@/lib/mongodb/thesis";

export default function useHandler() {
    const currentYear = new Date().getFullYear(); // Get the current year
    const startYear = 2005; // Start year
    const yearsArray = [];

    for (let year = startYear; year <= currentYear; year++) {
        yearsArray.push(year);
    }

    const [thesis, setThesis] = useState<ThesisProps>({
        studentName: "",
        title: "",
        year: 2005,
        abstract: "",
    })

    const [loading, setLoading] = useState<boolean>(false)
    const [success, setSuccess] = useState<string>("")

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const {name, value} = event.target;
        setThesis((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        setLoading(true);

        const result = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/thesis`, {
            method: 'POST',
            body: JSON.stringify(thesis)
        })

        setThesis({
            studentName: "",
            title: "",
            year: 2005,
            abstract: "",
        })

        setSuccess("Berhasil menambahkan skripsi")

        setTimeout(() => {
            setSuccess("")
        }, 3000)

        setLoading(false);
    };

    return {
        yearsArray, handleSubmit, handleInputChange, thesis, loading, success
    }
}