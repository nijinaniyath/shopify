import { UnAuthorizedException } from '@common/http-exceptions';
import { HTTP_STATUS } from '@common/constants';
import { ResponseModel } from "@common/response";
import db from "@db/db";
import { Request, Response } from 'express';

class AccountController {
    async create(req: Request, res: Response) {
        const account = new db.Account(req.body);
        await account.save();
        res.status(HTTP_STATUS.CREATED).json(new ResponseModel(null, 'Account has been created'));
    }

    async login(req: Request, res: Response) {
        const { user } = req;
        res.status(HTTP_STATUS.SUCCESS).json(user)

    }
}

export default new AccountController();