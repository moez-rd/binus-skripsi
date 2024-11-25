import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const session = cookies().get("user-session");

  if (!session?.value) {
    redirect("/login");
  }

  return children;
}
