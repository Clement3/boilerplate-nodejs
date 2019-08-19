const { Database, Sequelize } = require('../database')

class Blog extends Sequelize.Model {}

Blog.init({
  title: Sequelize.STRING,
  body: Sequelize.TEXT
}, { sequelize: Database.Instance, modelName: 'blogs' })

module.exports = new Blog
