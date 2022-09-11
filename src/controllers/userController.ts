import { Request, Response } from "express";
import * as userService from "../services/userService";

const signIn = async (req: Request, res: Response) => {
    const body = req.body;

    const token = await userService.signIn(body);

    return res.status(202).send({token});
};

const signUp = async (req: Request, res: Response) => {
    const body = req.body;

    await userService.signUp(body);
    
    return res.sendStatus(201);
};

export {
    signIn,
    signUp
};