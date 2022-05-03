import { HTTP_STATUS } from '@common/constants';

export class BaseException extends Error {
    constructor(public readonly status: string, public readonly code: number, public readonly error: string) {
        super(error);
        Error.captureStackTrace(this);
    }
}

export class BadRequestExceptions extends BaseException {
    constructor(message: string) {
        super('BAD_REQUEST', HTTP_STATUS.BAD_REQUEST, message);
    }
}

export class UnAuthorizedException extends BaseException {
    constructor(message: string) {
        super('UN_AUTHORIZED', HTTP_STATUS.UN_AUTHORIZED, message);
    }
}
export class NotFoundException extends BaseException {
    constructor(message: string) {
        super('NOT_FOUND', HTTP_STATUS.NOT_FOUND, message);
    }
}