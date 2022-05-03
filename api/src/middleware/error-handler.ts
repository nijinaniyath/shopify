import { NextFunction, Request, Response } from 'express';
import { BaseException } from '@common/http-exceptions';

class ErrorHandler {
    public handleError(error: Error, req: Request, res: Response, next: NextFunction) {
        if (error instanceof BaseException) {
            const status = error.code;
            return res.status(status).json(error)
        }
        console.log(error)
        res.status(500).json({ message: "internal server error" })
    }
}
export default new ErrorHandler();

