const connection = require('../../database/connection');

module.exports = {
    async index(request, response) {

        const uid = request.headers;

        if(!uid){
            return response.status(401).json({error: 'Você não está logado!'});
        }

        const usuario = await connection('consultores').where('id', uid.uid);

        const likes = usuario[0].likes;
        const dislikes = usuario[0].dislikes !== null ? usuario[0].dislikes.split(' ') : null;

        var investidores = await connection('investidores').select('*');
        var invs = []

        if (likes !== null){
            for(var i = 0; i < investidores.length; i++){
                if(likes.search(investidores[i].id) === -1 ){
                    invs.push(investidores[i]);
                } else {
                }
            }

            return response.json(invs[0]);
        }
        if (dislikes !== null){
            for(ids of dislikes){
                investidores = investidores.filter(invs => ids !== invs.id);
            }
        }


        return response.json(investidores[0]);
    }
}
