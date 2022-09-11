import joi from "joi";

const createCredentialSchema = joi.object({
    userId: joi.number().required(),
    title: joi.string().required(),
    url: joi.string().uri().required(),
    name: joi.string().required(),
    password: joi.string().required()
});

export {
    createCredentialSchema
};