import { geAllThesis } from "@/lib/firebase/queries";
import { findTheses } from "@/lib/mongodb/queries";
import Link from "next/link";

export default async function AdminPage() {
  const theses = await findTheses();

  return (
    <div className="h-screen">
      <div className="p-10 border rounded-lg max-w-4xl mx-auto mt-40">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Daftar Skripsi</h1>
          <Link
            href="/admin/create"
            className="bg-gray-900 text-white py-3 px-8 rounded-md font-medium hover:bg-gray-800 disabled:bg-gray-700"
          >
            Tambah +
          </Link>
        </div>

        <ul className="mt-10 divide-y">
          {theses?.map((thesis) => (
            <li
              key={thesis._id?.toString()}
              className="max-w-5xl flex justify-between gap-8 items-center py-6"
            >
              <div className="flex flex-col">
                <h2 className="text-xl font-semibold">{thesis.title}</h2>
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
              </div>
              <div>
                <Link href={`/admin/edit/${thesis._id?.toString()}`}>Edit</Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
