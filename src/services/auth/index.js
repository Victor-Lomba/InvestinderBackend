const { compare } = require('bcryptjs');
const { sign } = require('jsonwebtoken');

const connection = require('../../database/conection');
const authConfig = require('../../config/auth');


module.exports = {
    async execute({ email, password }) {
        const user = await connection('investidores').where('email', email);

        if (!user) {
            throw new Error('Cadastre-se antes de logar!');
        }
        
        if (user.password !== password) {
            throw new Error('Email/senha incorretos');
        }
    }
}