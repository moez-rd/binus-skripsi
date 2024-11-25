"use client";

import React, { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import axios from "axios";
import { Thesis } from "@/types";

export default function HomePage() {
  const [theses, setTheses] = useState<Thesis[]>();
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [found, setFound] = useState<boolean>(true);

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearch(event.target.value);
  };

  const handleSearchSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (search.length === 0) return;

    setLoading(true);

    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/theses/search`,
      {
        query: search,
      }
    );

    setFound(data.length !== 0);
    setTheses(data);

    setLoading(false);
  };

  return (
    <div className="max-w-6xl mx-auto mt-40 flex flex-col">
      <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-4xl">
        Cari Skripsi
      </h1>

      <div className="mt-20 max-w-xl">
        <form onSubmit={handleSearchSubmit} className="flex flex-row space-x-2">
          <input
            name="search"
            value={search}
            onChange={handleSearchInputChange}
            placeholder="Cari judul, penulis, abstrak"
            className="w-full"
          />
          <button
            type="submit"
            className="bg-gray-900 text-white py-3 px-8 rounded-md font-medium hover:bg-gray-800 disabled:bg-gray-700"
          >
            Cari
          </button>
        </form>
      </div>

      <div>
        {loading ? (
          <div className="flex flex-col items-center space-y-2 mt-32">
            <AiOutlineLoading3Quarters className="text-3xl animate-spin" />
            <p className="text-gray-500">Sedang mencari...</p>
          </div>
        ) : !found ? (
          <div className="flex flex-col items-center space-y-2 mt-32">
            <p className="text-gray-500">Skripsi tidak ditemukan</p>
          </div>
        ) : (
          <div className="p-6 flex flex-col divide-y">
            {theses?.map((thesis, id) => (
              <div key={id} className="max-w-5xl flex flex-col py-6">
                <h2 className="text-2xl font-semibold">{thesis.title}</h2>
                <div className="flex flex-row space-x-4">
                  <p>
                    <span className="font-semibold">Penulis</span>{" "}
                    {thesis.studentName}
                  </p>
                  <p>
                    <span className="font-semibold">NIM</span>{" "}
                    {thesis.studentId}
                  </p>
                  <p>
                    <span className="font-semibold">Tahun</span> {thesis.year}
                  </p>
                </div>
                <h3 className="font-medium mt-2 italic">Abstrak</h3>
                <p className="italic text-gray-600 text-sm">
                  {thesis.abstract}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
