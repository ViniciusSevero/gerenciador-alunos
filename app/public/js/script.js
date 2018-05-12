$(document).ready(function(){
    ativarItemMenu();
    $(".dropdown-trigger").dropdown();
    $('.datepicker').datepicker({
        i18n: {
            cancel:	'Cancelar',
            clear:	'Limpar',
            done:	'OK',
            previousMonth:	'‹',
            nextMonth:	'›',
            months:  [ 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro' ],
            monthsShort: [ 'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez' ],
            weekdays: [ 'Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado' ],
            weekdaysShort: [ 'Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab' ],
            weekdaysAbbrev:	[ 'D', 'S', 'T', 'Q', 'Q', 'S', 'S' ]
        },
        format: 'dd/mm/yyyy'
    });
    $('select').formSelect();
    $('.mask-rg').mask('00.000.000-0', {reverse: true});
    $('.mask-cpf').mask('000.000.000-00', {reverse: true});
    $('#filter').on('change', configureInputsSearch);
    showStatusMesage();
});

let filters = {
    "nome": ["nome"],
    "nome_mae": ["nome_mae", "sexo"],
    "cpf": ["cpf"],
    "rg": ["rg"],
    "dt_nascimento": ["dt_ini", "dt_fim", "sexo"],
    "nr_matricula": ["nr_matricula"],
    "dt_matricula": ["dt_ini", "dt_fim", "sexo"]
}

function ativarItemMenu(){
    $('nav a[href="' + window.location.pathname + '"]').parents('li').addClass('active');
}

function configureInputsSearch(){
    var filter = $(this).val();

    $('input, select', "div.filters")
            .not("#filter")
            .parents("div.input-field:not(.no-hide)")
            .addClass("hide");

    if(filter && filters != ""){
        var inputFilters = filters[filter];
        for(var idx in inputFilters){
            var key = inputFilters[idx];
            $('#' + key, "div.filters").parents("div.input-field").removeClass("hide");
        }
    }
}

function showStatusMesage(){
    var url = new URL(window.location.href);
    var status = url.searchParams.get("status");
    if(status == 1){
        M.toast({html: 'Aluno cadastrado com sucesso'})
    }
}

function formatDate(date){
    date = date + '';
    return date.slice(6, 8) + '/' + date.slice(4, 6) + '/' + date.slice(0,4);
}

function dateToNumber(date){
    var aux = date.split('/');
    return parseInt(aux[2] + aux[1] + aux[0]);
}