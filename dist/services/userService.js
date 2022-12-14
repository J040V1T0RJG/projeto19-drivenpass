"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUp = exports.signIn = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const userRepository = __importStar(require("../repositores/userRepository"));
dotenv_1.default.config();
const signIn = (signIpData) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = signIpData;
    const privateKey = `${process.env.PRIVATE_KEY}`;
    const creationDate = new Date;
    const emailData = yield userRepository.checkEmail(email);
    if (!emailData) {
        throw { code: "NotFound", message: "E-mail n??o cadastrado" };
    }
    ;
    const correctPassword = bcrypt_1.default.compareSync(password, emailData.password);
    if (!correctPassword) {
        throw { code: "NotAcceptable", message: "Senha e/ou e-mail incorreto(s)" };
    }
    ;
    const token = jsonwebtoken_1.default.sign({ email: emailData.email, id: emailData.id }, privateKey);
    yield userRepository.createOrUpdateToken({ userId: emailData.id, token, creationDate }, emailData.id);
    return token;
});
exports.signIn = signIn;
const signUp = (signUpData) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = signUpData;
    const emailData = yield userRepository.checkEmail(email);
    if (emailData) {
        throw { code: "Conflict", message: "Email j?? existente" };
    }
    ;
    const passwordEncrypt = bcrypt_1.default.hashSync(password, 10);
    yield userRepository.createUser({ email, password: passwordEncrypt });
});
exports.signUp = signUp;
