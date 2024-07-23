const http = require('http')
const app = require('./server.js')
const porta = 3000

console.log("[ iniciando servidor... ]")
const servidor = http.createServer(app)
servidor.listen(porta)
