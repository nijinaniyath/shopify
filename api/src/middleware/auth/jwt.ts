import { UnAuthorizedException } from '@common/http-exceptions';
import JWT from 'passport-jwt';
import db from "@db/db";
import dotenv from "dotenv";

dotenv.config();

const options = (): JWT.StrategyOptions => {
    return ({
        jwtFromRequest: JWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET
    });
}


const JWTStrategy = new JWT.Strategy(options(), async function (jwt_payload, done) {
    const account = await db.Account.findById(jwt_payload.user.id);
    if (!account) {
        throw new UnAuthorizedException("");
    }
    done(null, jwt_payload.user);
});

export default JWTStrategy;