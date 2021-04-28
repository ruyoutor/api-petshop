const roteador = require('express').Router()

const Fornecedor = require('./Fornecedor');
const TabelaFornecedor = require('./TabelaFornecedor');
const Tabela = require('./TabelaFornecedor')
const SerializadorFornecedor = require('../../Serializador').serializadorFornecedor

roteador.get('/', async (req, res) => {
    const resultado = await Tabela.listar();

    const serializador = new SerializadorFornecedor(
        res.getHeader('Content-Type')
    )

    res.status(200).send(serializador.serializar(resultado))
    
})

roteador.post('/', async (req, res, proximo) => {
    try {
        const dadosRecebidos = req.body
        const fornecedor = new Fornecedor(dadosRecebidos)
        await fornecedor.criar()
        
        const serializador = new SerializadorFornecedor(
            res.getHeader('Content-Type')
        )
        
        res.status(201).send(
            serializador.serializar(fornecedor)
        )
    } catch (error) {
        proximo(error)
    }
})

roteador.get('/:idFornecedor', async (req, res, proximo) => {

    try{
        const id = req.params.idFornecedor;
        const fornecedor = new Fornecedor({id: id})
        await fornecedor.carregar()

        const serializador = new SerializadorFornecedor(
            res.getHeader('Content-Type')
        )

        res.status(200).send(
            serializador.serializar(fornecedor)
        )
    } catch (error){
        proximo(error)
    }

})

roteador.put('/:idFornecedor', async (req, res, proximo) => {

    try {
        const id = req.params.idFornecedor
        const dadosRecebidos = req.body
        const dadosParaAtualizar = Object.assign({}, dadosRecebidos, {id: id})
        const fornecedor = new Fornecedor(dadosParaAtualizar)
        await fornecedor.atualizar()
        res.status(204).end()

     } catch (error) {
        proximo(error)
     }

})

roteador.delete('/:idFornecedor', async (req, res, proximo) => {
    try {
        const id = req.params.idFornecedor
        const fornecedor = new Fornecedor({id: id})
        await fornecedor.carregar()
        await fornecedor.remover()
        res.status(204).end()

    } catch (error) {
        proximo(error)
    }
})

module.exports = roteador;