const Sequelize = require('sequelize');

// Conexão banco de dados MYSQL
const sequelize = new Sequelize('postapp', 'root', 'Aruanda22', {
    host: 'localhost',
    dialect: 'mysql',
})

// Autenticação Banco de dados
sequelize.authenticate()
    .then(function (){
        console.log('Conectado com sucesso!')
    })
    .catch(function (erro){
        console.log('Falha ao se conectar:' + erro)
    })

module.exports = {
    Sequelize : Sequelize,
    sequelize : sequelize
}