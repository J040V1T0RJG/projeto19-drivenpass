import { cards } from "@prisma/client";

export type CardType = Omit<cards, "id">;