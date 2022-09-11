import Cryptr from "cryptr";
import dotenv from "dotenv";

import { CredentialData } from "../types/credentialTypes";
import * as credentialRepository from "../repositores/credentialRepository";
import { validateToken } from "../utils/validateToken";

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

const getCredentials = async (credentialId: number | undefined, authorization: string | undefined) => {
    const cryptr = new Cryptr(`${process.env.SECRET_PASSWORD}`);
    const {id: userId} = await validateToken(authorization);

    let credentials: any[];

    if (credentialId) {
        credentials = await credentialRepository.getCredentialsById(userId, credentialId);
        if (credentials.length === 0) {
            throw { code: "NotFound", message: "Credencial não existente e/ou pertencete a outro usuario" }
        };
    } else {
        credentials = await credentialRepository.getCredentials(userId);
    };

    credentials.map((credential: any , index: number) => {
        const descryptedPassword = cryptr.decrypt(credential.password);
        credentials[index].password = descryptedPassword;
    });

    return credentials;
};

const deleteCredential = async (credentialId: number, authorization: string | undefined) => {
    const {id: userId} = await validateToken(authorization);

    const { count } = await credentialRepository.deleteCredentialById(userId, credentialId);

    if (count === 0) {
        throw { code: "NotFound", message: "Credencial não existente e/ou pertencete a outro usuario" }
    };

    //console.log("deleted:", deleted)
};

export {
    createCredential,
    getCredentials,
    deleteCredential
};