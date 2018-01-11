(function(){

    jQuery.noConflict();

    jQuery('p, li, label, a').each(function(){
        var text = jQuery(this).text();
        text = text.split('');
        var newText = '';
        for (var i=0; i<text.length; i++) {
            newText += '<span class="nerp">'+ text[i] +'</span>';
        }
        jQuery(this).html(newText);
    });

    jQuery('.nerp').css({'position': 'relative', 'top' : "0px", 'left' : '0px'});

    var t = setInterval(function(){
        var x,y;

        jQuery('.nerp').each(function(){
            x = jQuery(this).css('left').split('px')[0];
            y = jQuery(this).css('top').split('px')[0];

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

            jQuery(this).css({'top':  y, 'left' : x, color : newColor()});
        });
    },100);

    function newColor() {
        var color = 'rgb('+ newNum()  +','+ newNum() +','+ newNum() +')';
        function newNum() {
            return Math.floor(Math.random() * 256 - 1);
        }
        return color;
    }
})();
