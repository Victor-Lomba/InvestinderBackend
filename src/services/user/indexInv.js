const connection = require('../../database/connection');

module.exports = {
    async index(request, response) {
        const { page = 1 } = request.query;

        const { id } = request.headers;

        const loggedUser = await connection('consultores').where('id', id);

        const [ count ] = await connection('investidores').count();

        const investidores = await connection('investidores')
            .limit(1)
            .offset(page - 1 )
            .select('investidores.pic', 'investidores.name', 'investidores.bio', 'investidores.interesses');
        response.header('X-Total-Count', count['count(*)']);

        if (loggedUser.includes('likes', investidores[0].id)){
            delete investidores[0];
        }

        if (loggedUser.includes('dislikes', investidores[0].id)){
            delete investidores[0];
        }

        return response.json(investidores);
    }
}
