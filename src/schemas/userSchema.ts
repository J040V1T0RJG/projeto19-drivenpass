import joi from "joi";

const signInSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
});

const signUpSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(10).required()
});

export {
    signInSchema,
    signUpSchema
};