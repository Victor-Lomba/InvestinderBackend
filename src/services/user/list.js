const connection = require('../../database/connection');

module.exports = {
    async index(request, response) {

        const uid = request.headers;

        if(!uid){
            return response.status(401).json({error: 'Você não está logado!'});
        }

        const usuario = await connection('investidores').where('id', uid.uid);

        const likes = usuario[0].likes;
        const dislikes = usuario[0].dislikes;

        var consultores = await connection('consultores').select('*');

        var consult = []

        if (likes !== null){

            for(var i = 0; i < consultores.length; i++){
                if(likes.search(consultores[i].id) === -1 ){
                    consult.push(consultores[i]);
                } else {
                }
            }

            return response.json(consult[0]);
        }
        if (dislikes !== null){
            for(ids of dislikes){
                consultores = consultores.filter(invs => ids !== invs.id);
            }
        }

        return response.json(consultores[0]);
    }
}
