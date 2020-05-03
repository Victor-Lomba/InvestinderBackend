const connection = require('../../database/connection');
const crypto = require('crypto');

module.exports = {
async create(request,response){
    const { name, email, password, telefone, bio, interesses, pic } = request.body;
    const id = crypto.randomBytes(8).toString('HEX');


    try {await connection('investidores').insert({
        id,
        name,
        email,
        password,
        telefone,
        bio,
        interesses,
        pic,
    })
}catch(err){
    console.log(err);
    if(err.code == 'SQLITE_CONSTRAINT'){
        return response.status(400).json({error: 'Esse e-mail já está sendo utilizado!'});
    }
}

    return response.json({ id, name, email, telefone, bio, interesses, pic });

    }

}
