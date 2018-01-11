$(document).ready(function() {
    "use strict";

    /**
     * Inside the following callback, write some javascript that will shuffle the cards. The rules are as follows:
     *      - Each square on the page represents a "Card"
     *      - You can create a new "deck" by clicking the "new deck" button. This will generate a random number of cards. 
     *      - To "shuffle" the cards means that all of the same cards with the same numbers will be present, but they will appear in a randomized order. 
     *      - you may not google for the answer
     *      - you may not use a 3rd party plugin to come up with the answer.
     *      - you may not use _.shuffle, however note that other uses of Underscore.js are allowed.
     *      - you get extra points if you can come up with a more efficient algorithm.
     */
    $('.shuffle').on('click', function () {
        var $cards = $('.card');
        var randArr = [];


        $cards.each(function (index, el) {
            var val = parseInt($(el).html());
            randArr.push(val);
        });


        function sort (randArr) {
            var arr = [];
            for (var x = 0; x < randArr.length; x++) {
                var val = randArr[x];

                var currVal;
                var lastVal;
                var added;

                // add in the first value :
                if (arr.length === 0) {
                    arr.push(val);

                } else {

                    added = false;

                    add:
                        for (var i = 0; i < arr.length; i++) {
                            currVal = arr[i];
                            lastVal = arr[i-1] ? arr[i-1] : 0;

                            if ((val >= lastVal) && (val <= currVal)) {
                                arr.splice(i, 0, val);
                                added = true;
                                break add;
                            }
                        }

                    if (!added) {
                        arr.push(val);
                    }
                }
            }
            return arr;
        }

        var nerp = sort(randArr);


        var sortit = function (randArr) {
            var obj = {};
            var arr = [];
            var highest = 0;

            randArr.forEach(function (val) {
                obj[val] = obj[val] ? obj[val]++ : 1;
                highest = (val > highest) ? val : highest;
            });

            for (var i=0; i<=highest; i++) {
                var num = obj[i];

                if (num) {
                    for (var j = 0; j < num; j++) {
                        arr.push(i);
                    }
                }
            }

            return arr;
        };


        var bubbleSort = function (randArr) {
            var curr;
            var next;

            for (var i = 0; i < randArr.length; i++) {
                curr = randArr[i];
                next = randArr[i+1];

                if (next < curr) {
                    randArr[i] = next;
                    randArr[i+1] = curr;
                    i = -1;
                }
            }

            return randArr;
        };

        var derp = bubbleSort(randArr);

        debugger;




    });





});


