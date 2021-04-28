class ConteudoNaoSuportado extends Error {
    constructor(contentType){
        super(`O tipo de conteúdo '${contentType}' não é suportado`)
        this.name = ConteudoNaoSuportado
        this.idErro = 3
    }
}

module.exports = ConteudoNaoSuportado