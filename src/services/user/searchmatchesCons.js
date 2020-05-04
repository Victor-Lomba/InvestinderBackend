const connection = require('../../database/connection');

module.exports = {
    async search(request,response){
        const body = request.body;
        const ids = body.id.split(' ');
        let resposta = [];
        for(let id of ids){
            resposta.push( await connection('investidores').where('id',id).first());
        }
        return response.json(resposta);
    }
}