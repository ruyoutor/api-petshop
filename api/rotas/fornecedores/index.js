const roteador = require('express').Router()

const Fornecedor = require('./Fornecedor');
const TabelaFornecedor = require('./TabelaFornecedor');
const Tabela = require('./TabelaFornecedor')

roteador.get('/', async (req, res) => {
    const resultado = await Tabela.listar();
    res.status(200).json(resultado);
    
})

roteador.post('/', async (req, res) => {
    const dadosRecebidos = req.body
    console.log(dadosRecebidos)
    const fornecedor = new Fornecedor(dadosRecebidos)
    await fornecedor.criar()

    res.send(
        JSON.stringify(fornecedor)
    )
})

roteador.get('/:idFornecedor', async (req, res) => {

    try{
        const id = req.params.idFornecedor;
        const fornecedor = new Fornecedor({id: id})
        await fornecedor.carregar()
        res.send(
            JSON.stringify(fornecedor)
        )
    } catch (error){
        res.send(
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
        res.end()
    
    } catch (error) {
        res.send(
            JSON.stringify({mensagem: error.message})
        )
    }

})

module.exports = roteador;