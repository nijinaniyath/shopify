import joi from 'joi';

const schema = joi.object({
    name: joi.string()
        .min(3)
        .max(10)
        .required(),
    description: joi.string()
        .max(100)
        .required()
})

export default schema;

