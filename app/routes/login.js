module.exports = (context) => {
    context.get("/", (req, resp) => {
        resp.render("login/login", {validacao: {}});
    });

    context.get("/logout", (req, resp) => {
        context.app.controllers.login.logout(context, req, resp);
    });

    context.post("/login", (req, resp) => {
        context.app.controllers.login.login(context, req, resp);
    });
}