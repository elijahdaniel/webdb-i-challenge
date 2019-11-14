const express = require('express')
const accountRouter = require('./accounts/account-router.js')
const server = express()

server.use(express.json())
server.use('/accounts', accountRouter)

server.get('/', (req, res) => res.send(`<h2>Database 1 Challenge</h2>`))

module.exports = server
