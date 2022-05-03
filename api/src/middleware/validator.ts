import { NextFunction, Request, Response } from "express";
import Joi from "joi";

import { BadRequestExceptions } from "@common/http-exceptions";

const validator = (schema: Joi.Schema) => {
    return (req: Request, _: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body, { abortEarly: true });
        const valid = error == null;

        if (valid) {
            next();
        } else {
            const { details } = error;
            const { message } = details[0];
            throw new BadRequestExceptions(message)
        }
    }
}

export default validator;