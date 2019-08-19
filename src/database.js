const Sequelize = require('sequelize')
const fs = require('fs')

class Database {
  // Retourne l'instance de la base de donnée
  get Instance () {
    return this.database
  }

  // Singleton pour avoir qu'une instance de la db
  // Return la classe
  getInstance () {
    if (!this.database) {
      this.database = new Sequelize('postgres://dbuser:secret@0.0.0.0:5432/mydb')
    }

    return this
  }

  async isConnected () {
    // Lecture du dossier ./Models en synchrone
    const models = fs.readdirSync(`${__dirname}/Models`)

    // On parcours la liste des models pour les charger un par un dans Sequelize
    for (const model of models) {
      this.database.models = require(`${__dirname}\\Models\\${model}`)
    }

    // Sync les models avec la base de données
    await this.database.sync({ force: true })

    // Retourne la Promesse avec await pour attendre qu'on sois bien authenticate avant de continuer
    return await this.database.authenticate()
  }
}

module.exports = { Database: new Database().getInstance(), Sequelize }
