const connection = require('../../database/connection');

module.exports = {
    async dislike(request, response) {
        const { TargID } = request.params;
        const { id } = request.headers;

        const loggedCons = await connection('consultores').where('id', id);
        const targetInvest = await connection('investidores').where('id', TargID);

        if (!targetInvest){
            throw new Error('404 not found');
        }

        const oldDislikes = loggedCons.likes;

        loggedCons.update('dislikes', [oldDislikes, targetInvest.id]);

        return response.json(loggedCons);
    }
}
