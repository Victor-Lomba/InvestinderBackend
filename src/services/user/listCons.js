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

        const investidores = await connection('investidores').select('*');

        const investid = investidores[0].id;

        if (likes !== null && likes.includes(investid)){
            const investidor = investidores.filter(investidor => investidor.id !== investid);

            return response.json(investidor[0]);
        }

        if(dislikes !== null && dislikes.includes(investid)){
            const investidor = investidores.filter(investidor => investidor.id !== investid);

            return response.json(investidor[0]);
        }

        const investidor = investidores[0];

        return response.json(investidor);
    }
}
