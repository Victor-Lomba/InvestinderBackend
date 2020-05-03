const connection = require('../../database/connection');

module.exports = {
    async dislike(request, response) {
        const { TargetId } = request.params;
        const UserId = request.headers;

        const loggedUser = await connection('consultores').where('id', UserId.id);

        const targetUser = await connection('investidores').where('id', TargetId);

        if (!targetUser) {
            throw new Error('Investidor não encontrado');
        }

        const oldDisLikes = loggedUser[0].dislikes;

        const newDisLikes = `${oldDisLikes} ${targetUser[0].id}`;

        await connection('investidores').where('id', UserId.id).update({ dislikes: newDisLikes });

        return response.json(loggedUser);
    }
}
