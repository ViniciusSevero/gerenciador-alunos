module.exports = (context) => {
    context.get("/aluno", (req, resp) => {
        context.app.controllers.aluno.cadastro(context, req, resp);
    });

    context.post("/aluno", (req, resp) => {
        context.app.controllers.aluno.cadastrar(context, req, resp);
    });

    context.get("/alunos", (req, resp) => {
        context.app.controllers.aluno.listar(context, req, resp);
    });

    context.post("/alunos/buscar", (req, resp) => {
        context.app.controllers.aluno.buscar(context, req, resp);
    });

    context.get("/", (req, resp) => {
        resp.render("login/login", {validacao: {}});
    });
}