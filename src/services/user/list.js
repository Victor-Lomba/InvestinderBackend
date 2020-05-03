const connection = require('../../database/connection');

module.exports = {
    async index(request, response) {

        const uid = request.headers;
        if(!uid){
            return response.status(401).json({error: 'Você não está logado!'});
        }

        const usuario = await connection('investidores').where('id', uid.uid);

        const likes = usuario[0].likes !== null ? usuario[0].likes.split(' ') : null;
        const dislikes = usuario[0].dislikes !== null ? usuario[0].dislikes.split(' ') : null;

        const consultores = await connection('consultores').select('*');

        if (likes !== null){
            consultores.filter(consultor => !likes.includes(consultor.id));
        }

        if(dislikes !== null){
            consultores.filter(consultor => !dislikes.includes(consultor.id));
        }

        const consultor = consultores[0];

        return response.json(consultor);
    }
}