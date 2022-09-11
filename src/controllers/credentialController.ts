import { Request, Response } from "express";
import * as credentialService from "../services/credentialService";

const createCredential = async (req: Request, res: Response) => {
    const body = req.body;

    await credentialService.createCredential(body);

    return res.sendStatus(201);
};

const getCredentials = async (req: Request, res: Response) => {
    const credentialId = <number | undefined>Number(req.query.credentialId);
    const { authorization } = req.headers;

    const credentials = await credentialService.getCredentials(credentialId, authorization);

    return res.status(200).send(credentials);
};

const deleteCredential = async (req: Request, res: Response) => {
    const credentialId  = Number(req.params.credentialId);
    const { authorization } = req.headers;

    await credentialService.deleteCredential(credentialId, authorization);

    return res.sendStatus(200);
};

export {
    createCredential,
    getCredentials,
    deleteCredential
};