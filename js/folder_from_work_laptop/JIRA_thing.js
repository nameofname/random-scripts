
// https://1stdibs.atlassian.net/issues/?filter=12206


function makeFormat() {
    $('tr').each(function(){
        var colorMap = {
            open : '#EBF7FA',
            reopened : '#EBF7FA',
            inprogress : '#D2F1F7',
            resolved : '#B3EAF5',
            closed : '#86DEF0'
        };
        var str = $(this).find('.status').text().toLowerCase().replace(/[^a-zA-Z]+/g,'');
        console.log(str,colorMap, colorMap[str]);
        $(this).height(50).css('background-color', colorMap[str]);
    });
}

$('.content-related').empty();
var but = $('<span>').attr('class', 'btn').html('FORMAT');
but.on('click', makeFormat);
$('.content-related').append(but);

