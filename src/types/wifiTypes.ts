import { wifi } from "@prisma/client";

export type WifiType = Omit<wifi, "id">;