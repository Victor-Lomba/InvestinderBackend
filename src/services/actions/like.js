const connection = require('../../database/connection');

module.exports = {
    async like(request, response) {
        const { TargetId } = request.params;
        const { UserId } = request.headers;

        const loggedUser = await connection('investidores').where('id', UserId);

        const targetUser = await connection('consultores').where('id', TargetId);

        if (!targetUser) {
            throw new Error('Consultor/acessor não encontrado');
        }

        const oldLikes = await connection('investidores').select('likes');

        const matcheck = await connection('consultores').select('likes');

        if (matcheck.includes(loggedUser)) {
            const loggedSocket = request.connectedUsers[id];
            const targetSocket = request.connectedUsers[TargID];

            if (loggedSocket) {
                request.io.to(loggedSocket).emit('Match!', targetCons);
            }

            if (targetSocket) {
                request.io.to(targetSocket).emit('Match!', loggedInv);
            }
        }

        await connection('investidores').update('likes', [oldLikes, targetUser.id]);


        return response.json(loggedUser);
    }
}
