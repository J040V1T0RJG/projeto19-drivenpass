"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCredentialSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const createCredentialSchema = joi_1.default.object({
    userId: joi_1.default.number().required(),
    title: joi_1.default.string().required(),
    url: joi_1.default.string().uri().required(),
    name: joi_1.default.string().required(),
    password: joi_1.default.string().required()
});
exports.createCredentialSchema = createCredentialSchema;
