const { compare } = require('bcryptjs');
const { sign } = require('jsonwebtoken');

const authConfig = require('../../config/auth');

interface Request {
    email: String;
    password: String;
}

interface Response {
    user: String;
    token: String;
}


class AuthUser {
    public async execute({ email, password }: Request): Response {
    }
}