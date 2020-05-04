const connection = require('../../database/connection');

module.exports = {
    async like(request, response) {
        const { TargetId } = request.params;
        const UserId = request.body;

        console.log(UserId.UserId);

        const loggedUser = await connection('consultores').where('id', UserId.UserId);

        const targetUser = await connection('investidores').where('id', TargetId);

        if (!targetUser) {
            return response.status(404).json({error: 'Usuário não encontrado!'});
        }

        const oldLikes = loggedUser[0].likes !== null ? loggedUser[0].likes.split(' ') : '';

        const matcheck = targetUser[0].likes !== null ? targetUser[0].likes.split(' ') : null;

        if (matcheck !== null && matcheck.includes(loggedUser[0].id)) {
            const OldMatches = loggedUser[0].matches !== null ? loggedUser[0].matches : '';
            const OldMatches2 = targetUser[0].matches !== null ? targetUser[0].matches : '';

            const newMatches = `${OldMatches} ${targetUser[0].id}`;
            const newMatches2 = `${OldMatches2} ${loggedUser[0].id}`;

            await connection('consultores').where('id', UserId.UserId).update({ matches: newMatches });
            await connection('investidores').where('id', TargetId).update({ matches: newMatches2 });
        }

        const newLikes = `${oldLikes} ${targetUser[0].id}`;

        await connection('consultores').where('id', UserId.UserId).update({likes: newLikes});

        return response.json(loggedUser);
    }
}
