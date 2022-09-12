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
exports.deleteWifiById = exports.getwifiById = exports.getWifi = exports.createWifi = void 0;
const database_1 = require("../config/database");
const createWifi = (wifi) => __awaiter(void 0, void 0, void 0, function* () {
    yield database_1.prisma.wifi.create({ data: wifi });
});
exports.createWifi = createWifi;
const getWifi = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield database_1.prisma.wifi.findMany({ where: { userId } });
});
exports.getWifi = getWifi;
const getwifiById = (userId, wifiId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield database_1.prisma.wifi.findMany({
        where: {
            AND: [
                { userId }, { id: wifiId }
            ]
        }
    });
});
exports.getwifiById = getwifiById;
const deleteWifiById = (userId, wifiId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield database_1.prisma.wifi.deleteMany({
        where: {
            AND: [
                { userId }, { id: wifiId }
            ]
        }
    });
});
exports.deleteWifiById = deleteWifiById;
