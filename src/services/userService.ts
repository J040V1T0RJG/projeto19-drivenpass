import bcrypt from "bcrypt";
import * as userRepository from "../repositores/userRepository";


const signIp = async (signIpData: {}) => {

};

const signUp = async (signUpData: {email: string, password: string}) => {
    const { email, password } = signUpData;

    const emailData = await userRepository.checkEmail(email);

    if (emailData) {
        throw { code: "Conflict", message: "Email já existente" }
    };

    const passwordEncrypt = bcrypt.hashSync(password, 10);
    
    await userRepository.createUser({email, password: passwordEncrypt})
};


export {
    signIp,
    signUp
};