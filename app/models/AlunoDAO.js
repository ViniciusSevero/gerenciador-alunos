function AlunoDAO(connection){
    this._connection = connection;
}

AlunoDAO.prototype.cadastrar = function(aluno, callback){
    console.log(aluno);
    this._connection.collection("alunos", function(err, collection){
        collection.insert(aluno);
        callback();
    });
};

AlunoDAO.prototype.buscar = function(filters, page, callback){
    let limit = 10;
    let skip = limit * (page - 1);

    this._connection.collection("alunos", function(err, collection){
        collection.find(
            filters,
            {
                limit,
                skip
            }
        )
        .toArray(function (err, itens) {
            collection.find(filters).count(function(err, count){
                let result = {};
                let div = parseInt(count / limit);
                result.itens = itens;     
                result.count = count;
                result.pages = (count % limit == 0 ? (div) : (div + 1));
                result.actualPage = page;
                callback(result);
            });
        });
    });
};

//no momento que o consign importa um módulo ele executa a função automaticamente
//entao retorno a classe, um prototype
module.exports = function(){ return AlunoDAO };
