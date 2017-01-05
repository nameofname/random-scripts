// http://pokemondb.net/pokedex/all
$('tr').each((idx, el) => { 
    const num = parseInt($(el).find('td').eq(0).text(), 10); 
    const name = $(el).find('td').eq(1).text();
    if (num > 151 || name.indexOf('Mega') !== -1) {
        $(el).remove()
    }
});


arr = [];

$('tr').each((idx, el) => { 
    const tds = $(el).find('td');
    const curr = {};
    curr.number = parseInt(tds.eq(0).text(), 10); 
    curr.name = tds.eq(1).text();
    curr.type = tds.eq(2).text();
    curr.total = parseInt(tds.eq(3).text(), 10);
    curr.hp = parseInt(tds.eq(4).text(), 10);
    curr.attack = parseInt(tds.eq(5).text(), 10);
    curr.defense = parseInt(tds.eq(6).text(), 10);
    curr.spAttack = parseInt(tds.eq(7).text(), 10);
    curr.spDef = parseInt(tds.eq(8).text(), 10);
    curr.speed = parseInt(tds.eq(9).text(), 10);

console.log(curr);
    arr.push(curr);
});
