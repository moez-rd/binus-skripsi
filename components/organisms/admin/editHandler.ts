import { Thesis, ThesisRequest } from "@/types";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function useEditHandler(id: string) {
  const currentYear = new Date().getFullYear(); // Get the current year
  const startYear = 2005; // Start year
  const yearsArray = [];

  for (let year = startYear; year <= currentYear; year++) {
    yearsArray.push(year);
  }

  const defaultThesis: Thesis = {
    studentName: "",
    studentId: "",
    title: "",
    year: 2005,
    abstract: "",
  };

  const [thesis, setThesis] = useState<Thesis>(defaultThesis);

  useEffect(() => {
    async function getThesis() {
      const thesisBefore = await axios.get(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/theses/${id}`
      );

      console.log(thesisBefore.data);

      setThesis(thesisBefore.data || defaultThesis);
    }

    getThesis();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

    const thesisRequest: ThesisRequest = {
      title: thesis.title,
      abstract: thesis.abstract,
      studentName: thesis.studentName,
      studentId: thesis.studentId,
      year: thesis.year,
    };

    const result = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/theses/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(thesisRequest),
      }
    );

    setSuccess("Berhasil memperbarui skripsi");

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
