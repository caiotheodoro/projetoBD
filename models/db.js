const Sequelize = require('sequelize')


    // Conex'ao BD
    const sequelize = new Sequelize('readacao','root','admin', {
        host: "localhost",
        dialect: 'mysql'
    })

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}