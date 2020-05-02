const connection = require('../../database/connection');

module.exports = {
    async index(request, response) {

        const uid = request.headers;

        const usuario = await connection('investidores').where('id', uid).select('*'); 

        const likes = usuario.likes;
        const dislikes = usuario.dislikes;

        const consultor = await connection('consultores').select('*');


        return response.json(consultor);
    }
}