import { Request, Response } from "express";
import * as wifiService from "../services/wifiService";

const createWifi = async (req: Request, res: Response) => {
    const body = req.body;

    await wifiService.createWifi(body); 

    return res.sendStatus(201);
};

const getWifi = async (req: Request, res: Response) => {
    const wifiId = <number | undefined>Number(req.query.wifiId);
    const { authorization } = req.headers;

    const wifi = await wifiService.getWifi(wifiId, authorization);

    return res.status(200).send(wifi);
};

const deleteWifi = async (req: Request, res: Response) => {
    const wifiId  = Number(req.params.wifiId);
    const { authorization } = req.headers;

    await wifiService.deleteWifi(wifiId, authorization);

    return res.sendStatus(200);
};

export {
    createWifi,
    getWifi,
    deleteWifi
};