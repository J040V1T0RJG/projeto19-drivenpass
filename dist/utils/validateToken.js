"use strict";
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
exports.validateToken = void 0;
const database_1 = require("../config/database");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validateToken = (authorization) => __awaiter(void 0, void 0, void 0, function* () {
    const token = authorization === null || authorization === void 0 ? void 0 : authorization.replace("Bearer", "").trim();
    if (!token) {
        throw { code: "Unauthorized", message: "Token necessario" };
    }
    ;
    const tokenData = yield database_1.prisma.sessions.findUnique({ where: { token } });
    if (!tokenData) {
        throw { code: "Unauthorized", message: "Token invalido" };
    }
    ;
    const d1 = Date.now();
    const d2 = tokenData.creationDate;
    const diff = d1 - Date.parse(`${d2}`);
    const oneHour = 3600000;
    if (diff > oneHour) {
        throw { code: "Unauthorized", message: "Token expirado, faça login novamente" };
    }
    ;
    const userData = jsonwebtoken_1.default.decode(token);
    return userData;
});
exports.validateToken = validateToken;
