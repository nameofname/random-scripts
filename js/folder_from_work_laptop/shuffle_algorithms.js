$(document).ready(function() {
    "use strict";


    // Generate a new deck of cards when clicking the .new button:
    $('.new').on('click', function () {
        var numOfCards = Math.floor(Math.random() * 100);

        $('#cards').empty();

        for(var i=0; i<numOfCards; i++) {
            var newCard = $('<div></div>').addClass('card well').text(i);
            $('#cards').append(newCard);
        }
    });


    // Sticks licki-champ to your mouse:
    $('body').on('mousemove', function(e){
        var x = e.clientX + 10,
            y = e.clientY + 10;

        $('.thing').css({
            left :  x,
            top : y
        });
    });


    // Ron's solution:
    /*
    $('.shuffle').on('click', function(){

        var cards = [];
        var cards = $('.card').remove(),
            reOrdered = new Array(cards.length),
            currLoop = 0;

        var j = 0;
        while (currLoop < cards.length) {

            var num = Math.floor(Math.random() * reOrdered.length);

            if (!reOrdered[num]) {
                reOrdered[num] = cards[currLoop];
                currLoop++;
            }
            console.log('ronald', j++);
        }

        $('#cards').append(reOrdered);

    });
    */


    // Shad's solution
    /*
    $('.shuffle').on('click', function(){
        var cards = $('.card');
        var sortArray = [], cellEls = [];
        cards.each(function (i, E) {
            sortArray.push(Math.random());
            cellEls.push(E);
        });
        var j = 0;
        cellEls.sort(function (a, b) {
            console.log('shad', ++j);
            return Math.floor(Math.random() * 10000);
            var aSortVal = sortArray[cellEls.indexOf(a)],
                bSortVal = sortArray[cellEls.indexOf(b)];
            if (aSortVal == bSortVal) {
                return 0;
            }
            return aSortVal > bSortVal ? 1 : -1;
        });
        $.each(cellEls, function (i, E) {
            $(E).prependTo(document.getElementById('cards'));
        });
    });
    */


// The Fisher-Yates Shuffle. 
function shuffle(array) {
    var tmp, current, top = array.length;

    var j = 0;
    if(top) while(--top) {
        console.log(++j);

        // current : a number in the range of the current top
        current = Math.floor(Math.random() * (top + 1));

        // get the array value at the current index:
        tmp = array[current];

        // assign the top array value to the random index
        array[current] = array[top];

        // assign the value from the random index to the top number
        array[top] = tmp;
    }

    return array;
}





});
