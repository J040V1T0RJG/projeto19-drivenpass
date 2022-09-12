"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCardSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const createCardSchema = joi_1.default.object({
    userId: joi_1.default.number().required(),
    title: joi_1.default.string().required(),
    number: joi_1.default.string().pattern(/^[0-9]+$/).required(),
    cardholderName: joi_1.default.string().uppercase().required(),
    securityCode: joi_1.default.string().length(3).pattern(/^[0-9]+$/).required(),
    expirationDate: joi_1.default.date().required(),
    password: joi_1.default.string().required(),
    isVitual: joi_1.default.boolean().required(),
    type: joi_1.default.string().valid("credit", "debit", "both").required()
});
exports.createCardSchema = createCardSchema;
