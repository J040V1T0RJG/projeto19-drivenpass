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
exports.deleteSecureNotesById = exports.getSecureNotesById = exports.getSecureNotes = exports.createSecureNotes = exports.checkTitle = void 0;
const database_1 = require("../config/database");
const checkTitle = (userId, title) => __awaiter(void 0, void 0, void 0, function* () {
    return yield database_1.prisma.secureNotes.findUnique({
        where: {
            userId_title: {
                userId,
                title
            }
        }
    });
});
exports.checkTitle = checkTitle;
const createSecureNotes = (secureNotes) => __awaiter(void 0, void 0, void 0, function* () {
    yield database_1.prisma.secureNotes.create({ data: secureNotes });
});
exports.createSecureNotes = createSecureNotes;
const getSecureNotes = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield database_1.prisma.secureNotes.findMany({ where: { userId } });
});
exports.getSecureNotes = getSecureNotes;
const getSecureNotesById = (userId, secureNotesId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield database_1.prisma.secureNotes.findMany({
        where: {
            AND: [
                { userId }, { id: secureNotesId }
            ]
        }
    });
});
exports.getSecureNotesById = getSecureNotesById;
const deleteSecureNotesById = (userId, secureNotesId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield database_1.prisma.secureNotes.deleteMany({
        where: {
            AND: [
                { userId }, { id: secureNotesId }
            ]
        }
    });
});
exports.deleteSecureNotesById = deleteSecureNotesById;
