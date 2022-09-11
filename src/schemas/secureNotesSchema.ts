import joi from "joi";

const validateSecureNotesSchema = joi.object({
    userId: joi.number().required(),
    title: joi.string().max(50).required(),
    annotation: joi.string().max(1000).required()
});

export {
    validateSecureNotesSchema
};