const connection = require('../../database/connection');

module.exports = {
    async search(request,response){
        const ids = response.body.split(' ');
        const resposta = [];
        for(let id of ids){
            resposta += await connection('consultores').where('id',id).select('*');
        }
        return response.json(resposta);
    }
}