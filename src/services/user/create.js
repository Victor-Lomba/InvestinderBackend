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
        throw new Error('Esse email já está cadastrado');
    }
}

    return response.json({ id, name, email, telefone, bio, interesses, pic });

    }

}
