const roteador = require('express').Router()

const Fornecedor = require('./Fornecedor');
const TabelaFornecedor = require('./TabelaFornecedor');
const Tabela = require('./TabelaFornecedor')

roteador.get('/', async (req, res) => {
    const resultado = await Tabela.listar();
    res.status(200).json(resultado);
    
})

roteador.post('/', async (req, res) => {
    try {
        const dadosRecebidos = req.body
        const fornecedor = new Fornecedor(dadosRecebidos)
        await fornecedor.criar()
        
        res.status(201).send(
            JSON.stringify(fornecedor)
        )
    } catch (error) {
        res.status(400).send(
            JSON.stringify({
                mensagem: error.message
            })
        )
    }
})

roteador.get('/:idFornecedor', async (req, res) => {

    try{
        const id = req.params.idFornecedor;
        const fornecedor = new Fornecedor({id: id})
        await fornecedor.carregar()

        res.status(200).send(
            JSON.stringify(fornecedor)
        )
    } catch (error){
        res.status(404).send(
            JSON.stringify({message: error.message})
        )
    }

})

roteador.put('/:idFornecedor', async (req, res) => {

    try {
        const id = req.params.idFornecedor
        const dadosRecebidos = req.body
        const dadosParaAtualizar = Object.assign({}, dadosRecebidos, {id: id})
        const fornecedor = new Fornecedor(dadosParaAtualizar)
        await fornecedor.atualizar()
        res.status(204).end()
            
    } catch (error) {
        res.status(204).send(
            JSON.stringify({mensagem: error.message})
        )
    }

})

roteador.delete('/:idFornecedor', async (req, res) => {
    try {
        const id = req.params.idFornecedor
        const fornecedor = new Fornecedor({id: id})
        await fornecedor.carregar()
        await fornecedor.remover()
        res.status(204).end()

    } catch (error) {
        res.status(404).send(
            JSON.stringify({
                    mensagem: error.message
            })
        )
        console.log(error)
    }
})

module.exports = roteador;