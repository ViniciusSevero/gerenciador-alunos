function UsuarioDAO(connection){
    this._connection = connection;
}

UsuarioDAO.prototype.autenticar = function(usuario, callback){
    this._connection.collection("usuarios", function(err, collection){
        collection.find(usuario).toArray(function(err, result){
            callback(err, result);
        });
    });
};

//no momento que o consign importa um módulo ele executa a função automaticamente
//entao retorno a classe, um prototype
module.exports = function(){ return UsuarioDAO };
