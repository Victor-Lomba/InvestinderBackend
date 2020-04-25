const bent = require('bent');


module.exports = async (coin,method) => {
    const crypto = bent('https://www.mercadobitcoin.net/api/','json');//url base da API de moedas virtuais
    crypto(`${coin}/${method}`).then((res) => { return res})
};