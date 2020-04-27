const connection = require('../../database/connection');

module.exports = {
    async update(request,response){
        const { userID } = request.headers;
        const dbUser = await connection('investidores').where('id', userID);
        const resposta = {};

        for(obj in request.body){
            if(obj){
                resposta[Object.keys(obj)] = obj;
                dbUser.update(Object.keys(obj),obj)
            }
        }
        return response.json(resposta);
    }
}