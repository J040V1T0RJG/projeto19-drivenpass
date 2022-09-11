import { SecureNotesType } from "../types/secureNotesTypes";
import * as secureNotesRepository from "../repositores/secureNotesRepository";

const createSecureNotes = async (secureNotesData: SecureNotesType) => {
    const { userId, title, annotation } = secureNotesData;

    const titleData = await secureNotesRepository.checkTitle(userId, title);

    if (titleData) {
        throw { code: "Conflict", message: "Titulo já existente" }
    };

    await secureNotesRepository.createSecureNotes(secureNotesData);
};

export {
    createSecureNotes
}