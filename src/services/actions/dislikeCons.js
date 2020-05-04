const connection = require('../../database/connection');

module.exports = {
    async dislike(request, response) {
        const { TargetId } = request.params;
        const UserId = request.body;

        const loggedUser = await connection('consultores').where('id', UserId.UserId);

        const targetUser = await connection('investidores').where('id', TargetId);

        if (!targetUser) {
            return response.status(404).json({error: 'Usuário não encontrado!'});
        }

        const oldDisLikes = loggedUser[0].dislikes !== null ? loggedUser[0].dislikes : '';

        const newDisLikes = `${oldDisLikes} ${targetUser[0].id}`;

        await connection('consultores').where('id', UserId.UserId).update({ dislikes: newDisLikes });

        return response.json(loggedUser);
    }
}
