const connection = require('../../database/connection');
const crypto = require('crypto');

module.exports ={
async create(request,response){
    const { name, email, password, telefone, bio, empresa, pic } = request.body;
    const id = crypto.randomBytes(8).toString('HEX');

    
    try {await connection('consultores').insert({
        id,
        name,
        email,
        password,
        telefone,
        bio,
        empresa,
        pic,
    })
}catch(err){
    console.log(err);
    if(err.code == 'SQLITE_CONSTRAINT'){
        throw new Error('Esse email já está cadastrado');
    }
}

    return response.json({ id, name, email, telefone, bio, empresa, pic });

    }

}
