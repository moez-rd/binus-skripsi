"use client";

import Link from "next/link";
import useHandler from "./handler";

interface Props {
  session: string | undefined;
}

export default function Topbar(props: Props) {
  const { session } = props;

  const { handleLogoutClick } = useHandler();

  return (
    <div className="bg-blue-200">
      <div className="flex flex-row justify-between max-w-5xl mx-auto h-14 items-center">
        <div className="flex items-center">
          <img src="/binas-logo.png" alt="Logo" className="h-10 mr-2" />
          <Link href="/" className="font-bold">
            Repository Skripsi Akademi Manajemen Informatika Komputer Bina
            Sriwijaya
          </Link>
        </div>
        <div>
          {session ? (
            <div className="space-x-2 flex items-start">
              <Link
                href="/admin"
                className="py-2 px-4 bg-gray-900 rounded text-gray-100 font-medium"
              >
                Admin
              </Link>
              <button
                onClick={handleLogoutClick}
                className="py-2 px-4 text-gray-900 font-medium"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="py-2 px-4 bg-gray-900 rounded text-gray-100 font-medium"
            >
              Login Admin
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
