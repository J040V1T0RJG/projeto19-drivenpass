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
exports.deleteCredential = exports.getCredentials = exports.createCredential = void 0;
const cryptr_1 = __importDefault(require("cryptr"));
const dotenv_1 = __importDefault(require("dotenv"));
const credentialRepository = __importStar(require("../repositores/credentialRepository"));
const validateToken_1 = require("../utils/validateToken");
dotenv_1.default.config();
const createCredential = (credentialData) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, title, password } = credentialData;
    const cryptr = new cryptr_1.default(`${process.env.SECRET_PASSWORD}`);
    const titleData = yield credentialRepository.checkTitle(userId, title);
    if (titleData) {
        throw { code: "Conflict", message: "Titulo já existente" };
    }
    ;
    const encryptedPassword = cryptr.encrypt(password);
    credentialData.password = encryptedPassword;
    yield credentialRepository.createCredential(credentialData);
});
exports.createCredential = createCredential;
const getCredentials = (credentialId, authorization) => __awaiter(void 0, void 0, void 0, function* () {
    const cryptr = new cryptr_1.default(`${process.env.SECRET_PASSWORD}`);
    const { id: userId } = yield (0, validateToken_1.validateToken)(authorization);
    let credentials;
    if (credentialId) {
        credentials = yield credentialRepository.getCredentialsById(userId, credentialId);
        if (credentials.length === 0) {
            throw { code: "NotFound", message: "Credencial não existente e/ou pertencete a outro usuario" };
        }
        ;
    }
    else {
        credentials = yield credentialRepository.getCredentials(userId);
    }
    ;
    credentials.map((credential, index) => {
        const descryptedPassword = cryptr.decrypt(credential.password);
        credentials[index].password = descryptedPassword;
    });
    return credentials;
});
exports.getCredentials = getCredentials;
const deleteCredential = (credentialId, authorization) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: userId } = yield (0, validateToken_1.validateToken)(authorization);
    const { count } = yield credentialRepository.deleteCredentialById(userId, credentialId);
    if (count === 0) {
        throw { code: "NotFound", message: "Credencial não existente e/ou pertencete a outro usuario" };
    }
    ;
});
exports.deleteCredential = deleteCredential;
