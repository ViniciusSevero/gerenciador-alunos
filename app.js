var app = require('./config/server');
var porta = process.env.PORT || 3000;

app.listen(porta, () => {
    console.log("servidor está rodando na porta " + porta + " com Express");
});

