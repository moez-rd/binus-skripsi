import { getThesisById, ThesisProps } from "@/lib/firebase/queries";
import React, { useEffect, useState } from "react";

export default function useEditHandler(id: string) {
  const currentYear = new Date().getFullYear(); // Get the current year
  const startYear = 2005; // Start year
  const yearsArray = [];

  for (let year = startYear; year <= currentYear; year++) {
    yearsArray.push(year);
  }

  const defaultThesis: ThesisProps = {
    studentName: "",
    studentId: "",
    title: "",
    year: 2005,
    abstract: "",
  };

  const [thesis, setThesis] = useState<ThesisProps>(defaultThesis);

  useEffect(() => {
    async function getThesis() {
      const thesisBefore = await getThesisById(id);
      setThesis(thesisBefore || defaultThesis);
    }

    getThesis();
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<string>("");

  const handleInputChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;
    setThesis((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);

    const result = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/theses/${id}`,
      {
        method: "UPDATE",
        body: JSON.stringify(thesis),
      }
    );

    setThesis({
      studentName: "",
      studentId: "",
      title: "",
      year: 2005,
      abstract: "",
    });

    setSuccess("Berhasil menambahkan skripsi");

    setTimeout(() => {
      setSuccess("");
    }, 3000);

    setLoading(false);
  };

  return {
    yearsArray,
    handleSubmit,
    handleInputChange,
    thesis,
    loading,
    success,
  };
}
