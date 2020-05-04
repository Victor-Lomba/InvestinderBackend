const connection = require('../../database/connection');

module.exports = {
    async search(request,response){
        const Matches = request.body;

        const match = Matches.Matches;
        const ids = match !== null ? match.split(' ') : null;
        let resposta = [];
        for(let id of ids){
            if(id != null){
                resposta.push(await connection('investidores').where('id', id).first());
            }
        }
        return response.json(resposta);
    }
}
