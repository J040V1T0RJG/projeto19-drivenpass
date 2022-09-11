import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import * as userRepository from "../repositores/userRepository";
import { IUserData, SessionData } from "../types/userTypes";
//import { date, date, number } from "joi";

dotenv.config();

const signIn = async (signIpData: IUserData) => {
    const { email, password } = signIpData;
    const privateKey: string = `${process.env.PRIVATE_KEY}`;
    const creationDate: Date = new Date;
     
    const emailData = await userRepository.checkEmail(email);

    if (!emailData) {
        throw { code: "NotFound", message: "E-mail não cadastrado" }
    };

    const correctPassword: boolean = bcrypt.compareSync(password, emailData.password);

    if (!correctPassword) {
        throw { code: "NotAcceptable", message: "Senha e/ou e-mail incorreto(s)" }
    };

    const token: string = jwt.sign({email: email}, privateKey);

    await userRepository.createOrUpdateToken({userId: emailData.id, token, creationDate}, emailData.id)

    return token;
};

const signUp = async (signUpData: IUserData) => {
    const { email, password } = signUpData;

    const emailData = await userRepository.checkEmail(email);

    if (emailData) {
        throw { code: "Conflict", message: "Email já existente" }
    };

    const passwordEncrypt = bcrypt.hashSync(password, 10);
    
    await userRepository.createUser({email, password: passwordEncrypt})
};


export {
    signIn,
    signUp
};