const connection = require('../../database/connection');

module.exports = {
    async dislike(request, response) {
        const { TargID } = request.params;
        const { id } = request.headers;

        const loggedInvest = await connection('investidores').where('id', id);
        const targetCons = await connection('consultores').where('id', TargID);

        if (!targetCons){
            throw new Error('404 not found');
        }

        const oldDislikes = loggedInvest.likes;

        loggedInvest.update('dislikes', [oldDislikes, targetCons.id]);

        return response.json(loggedInvest);
    }
}
