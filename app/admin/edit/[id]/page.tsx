"use client";

import useEditHandler from "@/components/organisms/admin/editHandler";

export default function Page({ params }: { params: { id: string } }) {
  const {
    yearsArray,
    handleSubmit,
    handleInputChange,
    thesis,
    loading,
    success,
  } = useEditHandler(params.id);

  return (
    <div className="h-screen">
      <div className="p-10 border rounded-lg max-w-4xl mx-auto mt-40">
        <h1 className="text-center font-bold text-3xl mb-10">Edit Skripsi</h1>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-10">
          <div className="flex flex-col space-y-1">
            <label>Judul</label>
            <input
              name="title"
              value={thesis.title}
              onChange={handleInputChange}
              type="text"
              placeholder="Judul"
              required
            />
          </div>

          <div className="flex flex-col space-y-1">
            <label>Nama mahasiswa</label>
            <input
              name="studentName"
              value={thesis.studentName}
              onChange={handleInputChange}
              type="text"
              placeholder="Nama mahasiswa"
              required
            />
          </div>

          <div className="flex flex-col space-y-1">
            <label>NIM mahasiswa</label>
            <input
              name="studentId"
              value={thesis.studentId}
              onChange={handleInputChange}
              type="text"
              placeholder="NIM mahasiswa"
              required
            />
          </div>

          <div className="flex flex-col space-y-1">
            <label>Tahun</label>
            <select
              name="year"
              value={thesis.year}
              onChange={handleInputChange}
              placeholder="Tahun"
              required
            >
              {yearsArray.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col space-y-1">
            <label>Abstrak</label>
            <textarea
              name="abstract"
              value={thesis.abstract}
              onChange={handleInputChange}
              placeholder="Abstrak"
              required
              className="h-80"
            ></textarea>
          </div>

          {success && (
            <div className="bg-green-100 p-4 rounded">
              <p className="text-green-600 font-medium">{success}</p>
            </div>
          )}

          <button
            type="submit"
            className="bg-gray-900 text-white py-3 px-8 rounded-md font-medium hover:bg-gray-800 disabled:bg-gray-700"
            disabled={loading}
          >
            {loading ? "Tunggu" : "Perbarui"}
          </button>
        </form>
      </div>
    </div>
  );
}
