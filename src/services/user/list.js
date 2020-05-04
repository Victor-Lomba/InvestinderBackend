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
        var consult = []

        if (likes !== null){
            consultores.forEach(item => likes.includes(item.id) && consult.push(item));
           return response.json(consult);
        }
        if (dislikes !== null){
            for(consultor of consultores){
                if (!dislikes.includes(consultor.id)){
                    consult.push(consultor);
                }
            }
            return response.json(consult[0]);
        }

        consult = consultores[0];

        return response.json(consultores[0]);
    }
}