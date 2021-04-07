const roteador = require('express').Router()

const Tabela = require('./TabelaFornecedor')

roteador.use('/', async (req, res) => {
    const resultado = await Tabela.listar();
    res.status(200).json(resultado);
    
})

module.exports = roteador;