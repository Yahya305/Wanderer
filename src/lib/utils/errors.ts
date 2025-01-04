export class PublicError extends Error {
    constructor(message: string) {
        super(message);
    }
}

export class AuthenticationError extends PublicError {
    constructor() {
        super("You must be logged in to view this content");
        this.name = "AuthenticationError";
    }
}

export class EmailInUseError extends PublicError {
    constructor() {
        super("Email is already in use");
        this.name = "EmailInUseError";
    }
}

export class NotFoundError extends PublicError {
    code = 404;
    constructor(message?:string) {
        super(message ?? "Resource not found");
        this.name = "NotFoundError";
    }
}

export class TokenExpiredError extends PublicError {
    constructor() {
        super("Token has expired");
        this.name = "TokenExpiredError";
    }
}

export class LoginError extends PublicError {
    code: number = 401;
    constructor() {
        super("Invalid email or password");
        this.name = "LoginError";
    }
}
