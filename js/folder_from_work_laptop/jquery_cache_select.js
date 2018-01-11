// jQuery object cacheing plugin:
(function(){

    // create empty object for cacheing:
    cache = {};

    // create container object that will be merged with jQuery object:
    obj1 = {};

    // create cache function that returns a jquery object, either newly created, or from the cache
    // accepts an optional 'expire' parameter <bool> - that tells the function to replace the cached version.
    obj1.cache = function(selector, expire){
        if (!(cache[selector] instanceof $) || expire) {
            var $obj = $(selector);
            cache[selector] =  $obj;
            return $obj;
        } else {
            return cache[selector];
        }
    }

    // extend jQuery with my new cacheing function.
    $.fn.extend($, obj1);

})($)


$.cache('#wrapper').hide();
$.cache('#wrapper').show();
