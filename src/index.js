// Importation du module express (https://expressjs.com)
const express = require('express')
const { Database } = require('./database')

// Création une instance express
const app = express()

// Création d'un middleware (intercepteur de requête) REQUEST -> MIDDLEWARE -> RESPONSE
const LogMiddleware = function (req, res, next) {
  const date = Date.now()
  console.log({ url: req.url, method: req.method, requestTime: date })
  next()
}

// On ajoute le middleware avant les routes
app.use(LogMiddleware)

// On créer une route qui à en param la requête (ce qu'on attend) et la réponse (ce qu'on retourne)
app.get('/', function (req, res) {
  res.json({ message: 'Hello World' })
})

// Si on est bien connecté à la DB on lance le serveur
Database.isConnected()
  .then(() => {
    // On lance le serveur sur le PORT 3000
    app.listen(3000, function () {
      console.log('Example app listening on port http://localhost:3000 !')
    })
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
  })


