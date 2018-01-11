// Raw JS implementation of dancing letters for speed optimization: 

setTimeout(function(){

    var nodeList = [],
        treeWalker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        null,
        false
    );

    while(treeWalker.nextNode()) {
        nodeList.push(treeWalker.currentNode);
    }

    for (var i=0; i<nodeList.length; i++){
        var textArr = nodeList[i].nodeValue.split(''),
            parentElement = nodeList[i].parentElement;

        parentElement.removeChild(nodeList[i]);
        for (var x=0; x<textArr.length; x++) {
            var newSpan = document.createElement('span');

            newSpan.setAttribute('class', 'nerp');
            newSpan.style.position = 'relative';
            newSpan.style.top = '0px';
            newSpan.style.left = '0px';

            newSpan.appendChild( document.createTextNode(textArr[x]) );
            parentElement.appendChild( newSpan, textArr[x]);
        }
    }

    var spanList = document.getElementsByClassName('nerp');

    var t = setInterval(function(){
        var x,y;

        for (var i=0; i<spanList.length; i++) {
            var n = spanList[i];
            x = n.style.left.split('px')[0];
            y = n.style.left.split('px')[0];

            if (Math.random(0,10) > .5) {
                x = parseInt(x) + 2;
            } else {
                x = parseInt(x) - 2;
            }
            if (Math.random(0,10) > .5) {
                y = parseInt(y) + 2;
            } else {
                y = parseInt(y) - 2;
            }

            n.style.color = newColor();
            n.style.top = y+'px';
            n.style.left = x+'px';
        }
    },300);

    function newColor() {
        var color = 'rgb('+ newNum()  +','+ newNum() +','+ newNum() +')';
        function newNum() {
            return Math.floor(Math.random() * 256 - 1);
        }
        return color;
    }

}, 1000);
