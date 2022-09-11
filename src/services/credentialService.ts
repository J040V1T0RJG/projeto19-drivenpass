import Cryptr from "cryptr";
import dotenv from "dotenv";

import { CredentialData } from "../types/credentialTypes";
import * as credentialRepository from "../repositores/credentialRepository";

dotenv.config();

const createCredential = async (credentialData: CredentialData) => {
    const { userId, title, password } = credentialData;
    const cryptr = new Cryptr(`${process.env.SECRET_PASSWORD}`);

    const titleData =  await credentialRepository.checkTitle(userId, title);

    if (titleData) {
        throw { code: "Conflict", message: "Titulo já existente" }
    };

    const encryptedPassword = cryptr.encrypt(password);
    credentialData.password = encryptedPassword;

    await credentialRepository.createCredential(credentialData);
};

export {
    createCredential
};