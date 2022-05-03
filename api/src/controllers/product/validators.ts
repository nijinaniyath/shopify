
import joi from 'joi';

const schema = joi.object({
    name: joi.string()
        .min(3)
        .max(10)
        .required(),
    note: joi.string()
        .max(100)
        .required(),
    category: joi.string()
        .max(3)
        .max(10)
        .required(),
    image: joi.string()
        .min(3)
})

export default schema;

