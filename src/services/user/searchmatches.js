const connection = require('../../database/connection');

module.exports = {
    async search(request,response){
        const Matches = request.body;
        const match = Matches.Matches;
        const ids = match.split(' ');
        let resposta = [];
        for(let id of ids){
            if(id != null){
                resposta.push(await connection('consultores').where('id', id).first());
            }
        }

        console.log(resposta);
        return response.json(resposta);
    }
}
