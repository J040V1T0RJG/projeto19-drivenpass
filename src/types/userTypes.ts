import { users, sessions } from "@prisma/client";

export type IUserData = Omit<users, "id">;
export type SessionData = Omit<sessions, "id">;