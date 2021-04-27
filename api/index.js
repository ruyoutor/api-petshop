const express = require('express')
const app = express()
const config = require('config')

const roteador = require('./rotas/fornecedores');

app.use(express.json());
app.use('/api/fornecedores', roteador)

app.listen(config.get('api.porta'), () => console.log('A API esta funcionando'))