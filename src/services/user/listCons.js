const connection = require('../../database/connection');

module.exports = {
    async index(request, response) {

        const uid = request.headers;

        if(!uid){
            return response.status(401).json({error: 'Você não está logado!'});
        }

        const usuario = await connection('consultores').where('id', uid.uid);

        const likes = usuario[0].likes !== null ? usuario[0].likes.split(' ') : null;
        const dislikes = usuario[0].dislikes !== null ? usuario[0].dislikes.split(' ') : null;

        var investidores = await connection('investidores').select('*');

        if (likes !== null){
            for(ids of likes){
                investidores = investidores.filter(invs => ids !== invs.id);
            }
           if (dislikes !== null){
            for(ids of dislikes){
                investidores = investidores.filter(invs => ids !== invs.id);
            }
           }
        }


        return response.json(investidores[0]);
    }
}
