import { Request, Response } from "express";
import * as userService from "../services/userService";

const signIn = async (req: Request, res: Response) => {

    res.sendStatus(202);
};

const signUp = async (req: Request, res: Response) => {
    const body = req.body;

    await userService.signUp(body);
    
    res.sendStatus(201);
};


export {
    signIn,
    signUp
}