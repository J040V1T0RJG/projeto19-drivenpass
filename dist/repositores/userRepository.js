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
exports.createOrUpdateToken = exports.createUser = exports.checkEmail = void 0;
const database_1 = require("../config/database");
const checkEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield database_1.prisma.users.findUnique({ where: { email } });
});
exports.checkEmail = checkEmail;
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    yield database_1.prisma.users.create({ data: user });
});
exports.createUser = createUser;
const createOrUpdateToken = (token, userId) => __awaiter(void 0, void 0, void 0, function* () {
    yield database_1.prisma.sessions.upsert({
        create: token,
        update: token,
        where: { userId: userId }
    });
});
exports.createOrUpdateToken = createOrUpdateToken;
