const path = require('path');
const fs = require('fs');

const connection = require('../../database/conection');
const uploadConfig = require('../../config/pic');

module.exports = {
    async execute(user_id, pic_filename){
        const user = connection('investidores').where('id', user_id);
        const userPic = user.select('pic');

        if (!user){
            throw new Error('Apenas usuários podem alterar a foto de perfil');
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