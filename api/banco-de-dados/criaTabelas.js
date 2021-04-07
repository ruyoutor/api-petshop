const ModeloTabela = require('../rotas/fornecedores/ModeloTabelaFornecedore')

ModeloTabela
    .sync() 
    .then(() => console.log('Tabela criado com sucesso'))
    .catch(console.log)