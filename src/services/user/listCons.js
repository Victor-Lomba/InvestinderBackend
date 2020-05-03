const connection = require('../../database/connection');

module.exports = {
    async index(request, response) {

        const uid = request.headers;
        if(!uid){
            return response.status(401).send();
        }

        const usuario = await connection('consultores').where('id', uid.uid);

        const likes = usuario[0].likes !== null ? usuario[0].likes.split(' ') : null;
        const dislikes = usuario[0].dislikes !== null ? usuario[0].dislikes.split(' ') : null;

        const investidores = await connection('investidores').select('*');

        if (likes !== null){
            investidores.filter(consultor => !likes.includes(consultor.id));
        }

        if(dislikes !== null){
            investidores.filter(consultor => !dislikes.includes(consultor.id));
        }

        const investidor = investidores[0];

        return response.json(investidor);
    }
}
