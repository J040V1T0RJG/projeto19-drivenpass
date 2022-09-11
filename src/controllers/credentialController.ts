import { Request, Response } from "express";
import * as credentialService from "../services/credentialService";

const createCredential = async (req: Request, res: Response) => {
    const body = req.body;

    await credentialService.createCredential(body);

    return res.sendStatus(201);
};

const getCredentials = async (req: Request, res: Response) => {

};

const deleteCredential = async (req: Request, res: Response) => {

};

export {
    createCredential,
    getCredentials,
    deleteCredential
};