// const { compare } = require('bcryptjs');
const { sign } = require('jsonwebtoken');

const connection = require('../../database/connection');
const authConfig = require('../../config/auth');

const { expiresIn, secret } = authConfig.jwt;

module.exports = {
    async execute({ email, password }) {
        const json = await connection('investidores').where('email', email);
        const user = json[0];

        if (!user) {
            const json2 = await connection('consultores').where('email', email);

            const user = json2[0];

            if (!user) {
                throw new Error('Cadastre-se antes de logar!');
            }

            if(user.password !== password) {
                throw new Error('Email/senha incorretos');
            }

            const token = sign({}, secret, {
                subject: user.id,
                expiresIn,
            });

            return { user, token };
        }

        if (user.password !== password) {
            throw new Error('Email/senha incorretos');
        }

        const token = sign({}, secret, {
            subject: user.id,
            expiresIn,
        });

        return { user, token };
    }
}
