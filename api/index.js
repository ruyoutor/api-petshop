const express = require('express')
const app = express()
const config = require('config')
const roteador = require('./rotas/fornecedores');
const NaoEncontrado = require('./erros/NaoEncontrado')
const CampoInvalido = require('./erros/CampoInvalido');
const DadosNaoFornecidos = require('./erros/DadosNaoFornecidos');
const ConteudoNaoSuportado = require('./erros/ConteudoNaoSuportado');
const formatosAceitos = require('./Serializador').formatosAceitos
const instancia = require('./banco-de-dados');

app.use(express.json());

app.use( (req, res, proximo) => {
    let formatoRequisitado = req.header('Accept')

    if (formatoRequisitado === '*/*'){
        formatoRequisitado = 'application/json'
    }

    if (formatosAceitos.indexOf(formatoRequisitado) === -1){
        res.status(406)
        res.end()
        return
    }
    res.setHeader('Content-Type', formatoRequisitado)
    proximo()
})

app.use('/api/fornecedores', roteador)
app.use( (error, req, res, proximo) => {

    let status = 500

    if (error instanceof NaoEncontrado){
        status = 404
    }
    
    if (error instanceof CampoInvalido || error instanceof DadosNaoFornecidos) {
        status = 400
    }

    if (error instanceof ConteudoNaoSuportado){
        status = 406
    }

    res.status(status)
    res.send(
        JSON.stringify({
            mensagem: error.message,
            id: error.idErro
        })
    )
})

app.listen(config.get('api.porta'), () => console.log('A API esta funcionando'))