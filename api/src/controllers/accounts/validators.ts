import joi from 'joi';

const accountSchema = joi.object({
    email: joi.string()
        .required()
        .min(3)
        .max(20)
        .email(),
    password: joi.string()
        .required()
        .min(5)
})

export default accountSchema;