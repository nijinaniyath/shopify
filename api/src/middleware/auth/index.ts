import { UnAuthorizedException } from '@common/http-exceptions';
import passport from 'passport';
import JWTStrategy from './jwt';
import localStrategy from "./local";

passport.use(localStrategy);
passport.use(JWTStrategy)


export default {
    local: passport.authenticate('local', { session: false }),
    jwt: passport.authenticate('jwt', { session: false })
}