const express = require('express')
const {usuario_valido} = require('../bd.js')
const app = express()
rota_login = express.Router()

rota_login.get('/', (req, res, next)=>{
    console.log("[ GET em login... ]")
    res.status(200).send({mensagem: "GET"})
})

rota_login.post('/', async (req, res, next)=>{
    console.log("[ POST em login... ]")
    const retorno_bd = await usuario_valido(req.body.usuario, req.body.senha)
    console.log(retorno_bd)
    if(retorno_bd != null) res.status(200).send(JSON.stringify({acesso: true, dados: retorno_bd}))
    else res.status(200).send(JSON.stringify({acesso: false, dados: null}))
    
})

module.exports = rota_login