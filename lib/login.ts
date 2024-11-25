import { User } from "@/types/user";

export function login(user: User) {
  const username: string = process.env.LOGIN_USERNAME || "";
  const password: string = process.env.LOGIN_PASSWORD || "";
  const session: string = process.env.LOGIN_SESSION || "";

  return {
    isFailed: !(user.username === username && user.password === password),
    session: session,
  };
}
