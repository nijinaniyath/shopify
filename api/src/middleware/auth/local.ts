import { Strategy } from "passport-local";
import jwt from "jsonwebtoken";
import db from "@db/db";
import { UnAuthorizedException } from '@common/http-exceptions';

interface ITokenResponse {
    email: string;
    id: string;
    token: string
}

const LocalAuthStrategy = new Strategy({
    usernameField: 'email'
}, async function (email, password, cb) {
    const account = await db.Account.findOne({ email });
    const isAuthenticated = await account.comparePassword(password);
    if (isAuthenticated) {
        const token = await signJwt(account);
        const user: ITokenResponse = {
            email: account.email,
            id: account._id,
            token
        }
        cb(null, user);
    } else {
        cb(new UnAuthorizedException("unauthorized error"), null)
    }
})

async function signJwt(account: any): Promise<string> {
    return jwt.sign({
        user: {
            id: account._id,
            email: account.email,
        }
    }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXP });
}

export default LocalAuthStrategy;