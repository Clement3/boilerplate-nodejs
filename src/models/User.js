const { Database, Sequelize } = require('../database')

class User extends Sequelize.Model {}

User.init({
  username: Sequelize.STRING,
  password: Sequelize.STRING
}, { sequelize: Database.Instance, modelName: 'users' })

module.exports = new User
