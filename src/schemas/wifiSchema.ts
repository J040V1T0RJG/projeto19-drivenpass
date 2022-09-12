import joi from "joi";

const createWifiSchema = joi.object({
    userId: joi.number().required(),
    title: joi.string().required(),
    name: joi.string().required(),
    password: joi.string().required()
});

export {
    createWifiSchema
};