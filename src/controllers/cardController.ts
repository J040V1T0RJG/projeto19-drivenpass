import { Request, Response } from "express";
import * as cardService from "../services/cardService";

const createCard = async (req: Request, res: Response) => {
    const body = req.body;

    await cardService.createCard(body);

    return res.sendStatus(201);
};

const getCards = async (req: Request, res: Response) => {
    const cardId = <number | undefined>Number(req.query.cardId);
    const { authorization } = req.headers;

    //const cards = await credentialService.getCredentials(credentialId, authorization);

    return res.status(200).send("cards");
};

const deleteCard = async (req: Request, res: Response) => {
    const cardId  = Number(req.params.cardId);
    const { authorization } = req.headers;

    //await credentialService.deleteCredential(credentialId, authorization);

    return res.sendStatus(200);
};

export {
    createCard,
    getCards,
    deleteCard
};