const connection = require('../../database/connection');

module.exports = {
    async index(request, response) {
        const { page = 1 } = request.query;

        const [ count ] = await connection('investidores').count();

        const investidores = await connection('investidores')
            .limit(1)
            .offset(page - 1 )
            .select('investidores.pic', 'investidores.name', 'investidores.bio', 'investidores.interesses');
        response.header('X-Total-Count', count['count(*)']);

        return response.json(investidores);
    }
}
