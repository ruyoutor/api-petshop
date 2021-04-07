const modelo = require('./ModeloTabelaFornecedore')

module.exports = {
    listar() {
        return modelo.findAll();
    }
}