import joi from "joi";

const createCardSchema = joi.object({
    userId: joi.number().required(),
    title: joi.string().required(),
    number: joi.string().pattern(/^[0-9]+$/).required(),
    cardholderName: joi.string().uppercase().required(),
    securityCode: joi.string().length(3).pattern(/^[0-9]+$/).required(),
    expirationDate: joi.date().required(),
    password: joi.string().required(),
    isVitual: joi.boolean().required(),
    type: joi.string().valid("credit", "debit", "both").required()
});

export {
    createCardSchema
};