//assim é como se eu exportasse um obj
// o meu módulo admin exporta várias coisas
module.exports.cadastro = function(context, req, resp){
    resp.render("aluno/cadastro", {user: req.session.user});
}

module.exports.cadastrar = function(context, req, resp){
    var aluno = req.body;
    if(aluno.dt_nascimento){
        aluno.dt_nascimento = context.app.utils.util.convertDate(aluno.dt_nascimento);
    }
    if(aluno.dt_matricula){
        aluno.dt_matricula = context.app.utils.util.convertDate(aluno.dt_matricula);
    }

    aluno.usuario_responsavel = req.session.user.username;
    
    context.config.dbConnection(function(connection){
        var alunoDAO = new context.app.models.AlunoDAO(connection);
        alunoDAO.cadastrar(aluno, function(){
            resp.redirect("/aluno?status=1");
        });
    });
}

module.exports.listar = function(context, req, resp){
    resp.render("aluno/lista", {user: req.session.user});
}

module.exports.buscar = function(context, req, resp){
    var filters = JSON.parse(req.body.filters);
    var page = req.body.page;

    context.app.utils.util.parseRegex(filters);

    context.config.dbConnection(function(connection){
        var alunoDAO = new context.app.models.AlunoDAO(connection);
        alunoDAO.buscar(filters, page, function(result){
            resp.json(result);
        });
    });
}