import { Request, Response } from "express";
import * as secureNotesService from "../services/secureNotesService";

const createSecureNotes = async (req: Request, res: Response) => {
    const body = req.body;

    await secureNotesService.createSecureNotes(body);

    return res.sendStatus(201);
};

const getSecureNotes = async (req: Request, res: Response) => {
    const secureNotesId = <number | undefined>Number(req.query.secureNotesId);
    const { authorization } = req.headers;

    const secureNotes = await secureNotesService.getSecureNotes(secureNotesId, authorization);

    return res.status(200).send(secureNotes);
};

const deleteSecureNotes = async (req: Request, res: Response) => {
    const credentialId  = Number(req.params.credentialId);
    const { authorization } = req.headers;

    return res.sendStatus(200);
};

export {
    createSecureNotes,
    getSecureNotes,
    deleteSecureNotes
};