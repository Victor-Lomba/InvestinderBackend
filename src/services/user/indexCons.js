const connection = require('../../database/connection');

module.exports = {
    async index(request, response) {
        const { page = 1 } = request.query;

        const { id } = request.headers;

        const loggedUser = await connection('investidores').where('id', id);

        const [ count ] = await connection('consultores').count();

        const consultores = await connection('consultores')
            .limit(1)
            .offset(page - 1 )
            .select('consultores.pic', 'consultores.name', 'consultores.bio', 'consultores.interesses');
        response.header('X-Total-Count', count['count(*)']);

        if (loggedUser.includes('likes', consultores[0].id)){
            delete consultores[0];
        }

        if (loggedUser.includes('dislikes', consultores[0].id)){
            delete consultores[0];
        }

        return response.json(consultores);
    }
}
