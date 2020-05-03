const connection = require('../../database/connection');

module.exports = {
    async like(request, response) {
        const { TargetId } = request.params;
        const UserId = request.headers;

        const loggedUser = await connection('consultores').where('id', UserId.userid);

        const targetUser = await connection('investidores').where('id', TargetId);

        if (!targetUser) {
            return response.status(404).json({error: 'Usuário não encontrado!'});
        }

        const oldLikes = loggedUser[0].likes;

        const matcheck = targetUser[0].likes;

        if (matcheck !== null && matcheck.indexOf(loggedUser[0].id)) {
            const OldMatches = loggedUser[0].matches;

            const newMatches = `${OldMatches} ${targetUser[0].id}`;
            const newMatches2 = `${OldMatches} ${loggedUser[0].id}`;

            await connection('consultores').where('id', UserId.userid).update({ matches: newMatches });
            await connection('investidores').where('id', TargetId).update({ matches: newMatches2 });

            const loggedSocket = request.connectedUsers[UserId.userid];
            const targetSocket = request.connectedUsers[TargetId];

            if (loggedSocket) {
                request.io.to(loggedSocket).emit('Match!', targetUser);
            }

            if (targetSocket) {
                request.io.to(targetSocket).emit('Match!', loggedUser);
            }
        }

        const newLikes = `${oldLikes} ${targetUser[0].id}`;

        delete null;

        await connection('consultores').where('id', UserId.userid).update({likes: newLikes});

        return response.json(loggedUser);
    }
}
