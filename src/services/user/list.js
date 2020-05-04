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

        var consultores = await connection('consultores').select('*');

        if (likes !== null){
            for(ids of likes){
                consultores = consultores.filter(cons => ids !== cons.id);
           }
           if (dislikes !== null){
            for(ids of dislikes){
                consultores = consultores.filter(cons => ids !== cons.id);
            }
           }
        }


        return response.json(consultores[0]);
    }
}
