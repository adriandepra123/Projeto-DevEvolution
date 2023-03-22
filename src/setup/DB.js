const mongoose = require('mongoose');
function connect() {
    const url = 'mongodb://127.0.0.1:27017/DevEvolution'; // URL do banco de dados
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('Conexão estabelecida com sucesso!'))
        .catch((error) => console.error('Erro ao conectar ao banco de dados:', error));
}

module.exports = {
    connect
};