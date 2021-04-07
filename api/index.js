const express = require('express')
const app = express()
const config = require('config')

const roteador = require('./rotas/fornecedores');

app.use('/api/fornecedores', roteador)

app.use(express.json());

app.listen(config.get('api.porta'), () => console.log('A API esta funcionando'))