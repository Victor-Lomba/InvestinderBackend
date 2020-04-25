const path = require('path');
const fs = require('fs');

const connection = require('../../database/connection');
const uploadConfig = require('../../config/pic');

module.exports = {
    async execute(user_id, pic_filename){
        const user = connection('investidores').where('id', user_id);
        const userPic = user.select('pic');

        if (!user){
            const userConsultor = connection('consultores').where('id', user_id);
            const userCPic = userConsultor.select('pic');

            if (!userConsultor) {
                throw new Error('Apenas usuários podem alterar a foto de perfil');
            }

            if (userCPic) {
                const cpicPath = path.join(uploadConfig.directory, userCPic);

                const cpicExists = await fs.promises.stat(cpicPath);

                if(cpicExists) {
                    await fs.promises.unlink(cpicPath);
                }
            }

            userCPic = pic_filename;

            await connection('consultores').insert({ pic: pic_filename });

            return userConsultor;
        }

        if (userPic){
            const picPath = path.join(uploadConfig.directory, userPic);

            const picExists = await fs.promises.stat(picPath);

            if (picExists) {
                await fs.promises.unlink(picPath);
            }
        }

        userPic = pic_filename;

        await connection('investidores').insert({ pic: pic_filename });

        return user;
    }
}
