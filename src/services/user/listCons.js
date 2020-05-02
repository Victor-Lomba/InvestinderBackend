const connection = require('../../database/connection');

module.exports = {
    async index(request, response) {

        const uid = request.headers;

        const usuario = await connection('consultores').where('id', uid).select('*'); 

        const likes = usuario.likes;
        const dislikes = usuario.dislikes;

        const consultor = await connection('investidores').select('*');


        return response.json(consultor);
    }
}