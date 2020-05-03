const connection = require('../../database/connection');

module.exports = {
    async index(request, response) {
    
        if(!request.headers.authorization)return response.status(401).send();
        const uid = request.headers.authorization;

        const usuario = await connection('investidores').where('id', uid).select('*');

        const likes = usuario.likes.split(' ');
        const dislikes = usuario.dislikes;

        
        

        const consultor = await connection('consultores').select('*');


        var resposta = [];
        if(!likes == null){
            for(let y of consultor){
            let liked = false;
                for(let i of likes){
                    if(i == y.id)
                    {
                        liked = true;
                    }
                }
                if(!liked){resposta += y}
            }
        }
        if(!dislikes == null){}
        resposta = consultor[0];
       

            
        


        return response.json(resposta);
    }
}