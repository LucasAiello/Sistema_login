const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser')

const app = express()
const rota_login = require('./rotas/rota_login.js')
const rota_professor = require('./rotas/rota_professor.js')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cors());
app.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next()
})

app.use('/professor', rota_professor)
app.use('/login', rota_login)

module.exports = app