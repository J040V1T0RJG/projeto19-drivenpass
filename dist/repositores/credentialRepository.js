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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCredentialById = exports.getCredentialsById = exports.getCredentials = exports.createCredential = exports.checkTitle = void 0;
const database_1 = require("../config/database");
const checkTitle = (userId, title) => __awaiter(void 0, void 0, void 0, function* () {
    return yield database_1.prisma.credentials.findUnique({
        where: {
            userId_title: {
                userId,
                title
            }
        }
    });
});
exports.checkTitle = checkTitle;
const createCredential = (credential) => __awaiter(void 0, void 0, void 0, function* () {
    yield database_1.prisma.credentials.create({ data: credential });
});
exports.createCredential = createCredential;
const getCredentials = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield database_1.prisma.credentials.findMany({ where: { userId } });
});
exports.getCredentials = getCredentials;
const getCredentialsById = (userId, credentialId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield database_1.prisma.credentials.findMany({
        where: {
            AND: [
                { userId }, { id: credentialId }
            ]
        }
    });
});
exports.getCredentialsById = getCredentialsById;
const deleteCredentialById = (userId, credentialId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield database_1.prisma.credentials.deleteMany({
        where: {
            AND: [
                { userId }, { id: credentialId }
            ]
        }
    });
});
exports.deleteCredentialById = deleteCredentialById;
