import { secureNotes } from "@prisma/client";

export type SecureNotesType = Omit<secureNotes, "id">
