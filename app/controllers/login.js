module.exports.login = function(context, req, resp){
    var dadosForm = req.body;

	req.assert('username', 'Usuário não deve ser vazio').notEmpty();
	req.assert('password', 'Senha não deve ser vazia').notEmpty();

	var erros = req.validationErrors();

	if(erros){
		resp.render("login/login", {validacao:erros});
		return;
	}

    context.config.dbConnection(function(connection){
        var usuarioDAO = new context.app.models.UsuarioDAO(connection);
        usuarioDAO.autenticar(dadosForm,function(err, result){
            if(result[0] != undefined){
                req.session.user = {}
                req.session.user['username'] = result[0].username;
                req.session.user['_id'] = result[0]._id;
                resp.redirect("/alunos");
            } else {
                resp.render("login/login", {validacao: [
                    { msg: "Usuário e/ou senha inválidos" }
                ]});
            }
        });
    });
}

module.exports.logout = function(context, req, resp){
    req.session.destroy( function(err){
		resp.render("login/login", {validacao: {}});
	}); 
}