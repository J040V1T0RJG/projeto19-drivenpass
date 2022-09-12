"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSecureNotesSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const validateSecureNotesSchema = joi_1.default.object({
    userId: joi_1.default.number().required(),
    title: joi_1.default.string().max(50).required(),
    annotation: joi_1.default.string().max(1000).required()
});
exports.validateSecureNotesSchema = validateSecureNotesSchema;
