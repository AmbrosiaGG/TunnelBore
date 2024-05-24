const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
import chalk from 'chalk';
const path = require('path')
const MongoStore = require('connect-mongo');
const PORT = process.env.PORT || 3341 // Uselessness of packages

const app = express()

app.use(require('cors')())
app.set("view engine", require('ejs'))
app.use(session({
  secret: process.env.session_secret, // Leaky Leaky
  resave: true,
  saveUninitialized: false,
  // store: MongoStore.create({ mongoUrl: process.env.mongoose }) // IF MONGODB ONLY!
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api", require('./routers/api'))
app.use("", require('./routers/index')) // For / Route 
app.use("/dashboard", require('./routers/dashboard'))
app.use('/assets', express.static(path.join(__dirname, 'assets')))
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')))

// Handlers
require('./database/init')

/*
app.use((req, res, next) => {
  res.status(404).render(__dirname+'/views/errors/404.ejs', {
    
  })
}) // 404 Duck not found
*/

app.listen(PORT, () => {
  console.log(chalk.blue("[EXPRESS]") + chalk.green(" Running on port:", PORT))
})