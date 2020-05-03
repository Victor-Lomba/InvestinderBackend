const connection = require('../../database/connection');

module.exports = {
    async like(request, response) {
        const { TargetId } = request.params;
        const UserId = request.headers;

        const loggedUser = await connection('investidores').where('id', UserId.id);

        const targetUser = await connection('consultores').where('id', TargetId);

        if (!targetUser) {
            throw new Error('Consultor/acessor não encontrado');
        }

        const oldLikes = loggedUser[0].likes;

        const matcheck = targetUser[0].likes;

        if (matcheck !== null && matcheck.indexOf(loggedUser.id)) {
            const OldMatches = loggedUser[0].matches;

            const newMatches = `${OldMatches} ${targetUser[0].id}`;

            await connection('consultores').where('id', UserId.id).update({ matches: newMatches });

            const loggedSocket = request.connectedUsers[UserId.id];
            const targetSocket = request.connectedUsers[TargetId];

            if (loggedSocket) {
                request.io.to(loggedSocket).emit('Match!', targetUser);
            }

            if (targetSocket) {
                request.io.to(targetSocket).emit('Match!', loggedUser);
            }
        }

        const newLikes = `${oldLikes} ${targetUser[0].id}`;

        await connection('consultores').where('id', UserId.id).update({ likes: newLikes });

        return response.json(loggedUser);
    }
}
