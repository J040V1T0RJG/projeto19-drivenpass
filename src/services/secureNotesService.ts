import { SecureNotesType } from "../types/secureNotesTypes";
import * as secureNotesRepository from "../repositores/secureNotesRepository";
import { validateToken } from "../utils/validateToken";

const createSecureNotes = async (secureNotesData: SecureNotesType) => {
    const { userId, title } = secureNotesData;

    const titleData = await secureNotesRepository.checkTitle(userId, title);

    if (titleData) {
        throw { code: "Conflict", message: "Titulo já existente" }
    };

    await secureNotesRepository.createSecureNotes(secureNotesData);
};

const getSecureNotes = async (secureNotesId: number | undefined, authorization: string | undefined) => {
    const {id: userId} = await validateToken(authorization);

    let secureNotes;

    if (secureNotesId) {
        secureNotes = await secureNotesRepository.getSecureNotesById(userId, secureNotesId);
        if (secureNotes.length === 0) {
            throw { code: "NotFound", message: "Notas seguras não existente e/ou pertencete a outro usuario" }
        };
    } else {
        secureNotes = await secureNotesRepository.getSecureNotes(userId);
    };

    return secureNotes;
};

const deleteSecureNotes = async (secureNotesId: number, authorization: string | undefined) => {
    const {id: userId} = await validateToken(authorization);
    console.log("id", userId, secureNotesId);

    const { count } = await secureNotesRepository.deleteSecureNotesById(userId, secureNotesId);
    console.log("count: ", count)
    if (count === 0) {
        throw { code: "NotFound", message: "Notas seguras não existente e/ou pertencete a outro usuario" }
    };
};

export {
    createSecureNotes,
    getSecureNotes,
    deleteSecureNotes
};