const connection = require('../../database/connection');

module.exports = {
    async index(request, response) {
        const { page = 1 } = request.query;

        const [ count ] = await connection('consultores').count();

        const consultores = await connection('consultores')
            .limit(1)
            .offset(page - 1 )
            .select('consultores.pic', 'consultores.name', 'consultores.bio', 'consultores.interesses');
        response.header('X-Total-Count', count['count(*)']);

        return response.json(consultores);
    }
}
