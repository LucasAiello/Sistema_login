const express = require('express')
const {alunosDeProfessor, alterarPontos} = require('../bd.js')
const rota = express.Router()

rota.get('/:id', async (req, res, next)=>{
    console.log("[ GET em professor... ]")
    const retorno_bd = await alunosDeProfessor(req.params.id)
    res.status(200).send(retorno_bd)
})

rota.post('/', async (req, res, next)=>{
    console.log("[ POST em professor... ]")
    const retorno_bd = await alterarPontos(parseInt(req.body.id), parseInt(req.body.pts))
   if (retorno_bd == undefined) res.status(300).send({})
    else res.status(200).send({status: "ok"})
})

module.exports = rota