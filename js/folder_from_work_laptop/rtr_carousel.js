// RTR Carousel plugin
// @author = ron w. 
// this plugin should apply most styles you will need for a carousel
// and it contains callback functions for ajaxifying more nodes into the carousel
// AND it supports fluid layout carousels. 
// There is not yet support for horizontal scrolling carousels.  Because they are lame.  
// NOTE: This carousel fires several global events (on the document object) That you can linsten on for user interactions
//      1- "rtr_carousel" : triggers when the carousel has been added
//      2- "rtr_carousel_resize" : triggers when the carousel resizes (on window.resize) NOT CURRENTLY WORKING NOT CURRENTLY WORKING. 
//      3- "rtr_carousel_add_node" : triggers when a new node has been added.  
//      4- "rtr_carousel_start" : triggers when a carousel starts.  
//      5- "rtr_carousel_stop" : triggers when a carousel stops.  
// TODO: add window.resize callback for fluid width carousels. 



$.fn.rtr_carousel = function(user_options,  callback) {
    //Default overlay options
    var self = this; // An array of all elements that match the selector the plugin was called on. 

    return this.each(function(key, elem) {
        var optn = {
            num: 2, // number to advance
            left: 'rtr_carousel_prev', // left arrow CLASS name
            right: 'rtr_carousel_next', // right arrow CLASS name
            fluid : false  // true for fluid width carousels (for use in fluid layout) 
        },
        //Override default values if there are any to override
        opt =  $.extend(optn, user_options);
        var self1 = this; // self1 is a reference to the current object internally, whereas self is a reference to all matched objects. 
        // all variables local to this function stored in the following object: 
        var vars = {
            init_flag : false, 
            l_arrow : $('<div>').attr('class', opt.left), 
            r_arrow : $('<div>').attr('class', opt.right), 
	        ul : $(this).find('ul'), 
	        text : $(this).text(), 
	        count : $(this).find('ul li').length, 
	        width : null, // width of the ul elem.  
            viewport_width : null, // the width of the viewport.  used to figure out vars.viewport 
            viewport: null, // the number of li elems in the viewport
            li_width : null, // the width of a single li elem
            curr_total: null, // the total number of li elems
            curr_index: 0, // the current index - starts at 0, advances 1 every time you move to the right. 
            max_index : null, // the number of li elems outside of the viewport. index cannot be greater than this. 
            curr_leftpos : null, // the current position left of the ul elem
            animating : false, // a flag to denote that the carousel is currently animating.  click events are disabled when true. 
            scroll_num : opt.num
        }

        if (opt.fluid) {
            init_fluid(); 
        }

        init(); //call the init funciton 

        // Init carousel - internal helper
        function init() {
            // the following only get set up when the plugin is initted. 
            if (!vars.int_flag) {
                div_stylz = {
                    'overflow' : 'hidden', 
                    'position' : 'relative'
                };  
                ul_stylz = {// all css styles to add to parent container
                    'position' : 'relative'
                };  
                li_stylz = {// all css styles to add to parent container
                    'float' : 'left'
                };  
                // Aply styles to ul and li elements. 
                $(self1).css(div_stylz); 
                vars.ul.css(ul_stylz); 
                vars.ul.find('li').css(li_stylz); 
                // on init, read the current left position, useful if you are resizing or adding nodes. = vars.ul.css('left'); 
                (vars.ul.css('left')  == 'auto') ? vars.curr_leftpos = 0 : vars.curr_leftpos =  parseInt(vars.ul.css('left').split('px')[0]); 
                // get the width of li elements, and make ul the correct width
                vars.init_flag = true; // set the init flag to true. 
                // Add left and right arrows and corresponding click events. 
                $(self1).before(vars.l_arrow); 
                $(self1).after(vars.r_arrow); 
                $(vars.r_arrow).click(function(){
                    self1.next(); 
                });
                $(vars.l_arrow).click(function(){
                    self1.prev(); 
                });
            }
            // the following get set up every time init() is called.  exe. if a node is added these values need to be re-calculated. 
            var one_li = vars.ul.find('li')[0]; 
            vars.li_width = parseInt($(one_li).width()); 
            vars.curr_total = vars.ul.find('li').length; 
            vars.width = (vars.curr_total + 1) * vars.li_width; 
            vars.ul.width(vars.width); 
            vars.viewport_width = $(self1).width(); 
            vars.viewport = Math.floor(vars.viewport_width / vars.li_width);
            // figure out max_index. NOTE: use Math.ceil() in likely incase of decimal. 
            vars.max_index = Math.ceil((vars.curr_total - vars.viewport) / opt.num); 
            check_disabled(); 
        }

        // Init events for fluid layout carousel. - internal helper
        function init_fluid() {
            $(window).resize(function(){
                // mondify the width of the unordered list. 
                // $(self1).trigger('rtr_carousel_resize'); 
                // TODO: add window.resize callback for fluid width carousels. 
                // NOTE: make sure that the carousel viewport only resizes if there is enough room for another li elem. 
            }); 
        }

        // Public functions follow. 
        /**
         * @function add_node - adds a node to your carousel. 
         * @param node - should be a list item element. 
         * @param inside_viewport <bool> - true if you want it to be appended in the viewport. It will be appended to the 
         * end of the carousel if left blank or specified false. 
         * @param callback- 
         */
        this.add_node = function(node, inside_viewport, callback) {
            //var n = $('<li>').css({'display':'none' , 'float' : 'left'}).append(node); 
            var index = vars.curr_leftpos / (vars.li_width * -1); 
            if (!inside_viewport) {
                $(vars.ul).append(node); 
            } else {
                $(vars.ul).find('li').eq(index).before(node); 
            }
            init(); 
            $(node).show('slow'); 
        	if (typeof(callback) == 'function') {
                callback.call(this, vars); 
            }
            $(self1).trigger('rtr_carousel_addnode', [this, vars]); 
            return this; 
        }

        this.next = function(callback){
            var new_left; 
            // if the carousel is currently animating do not advance. 
            if (vars.animating) {
                return false; 
            }
            // if this is the last scroll, do not scroll the entire opt.num in case it goes too far. 
            if (vars.curr_index == (vars.max_index - 1))
            {
                new_left = -(vars.curr_total - vars.viewport) * vars.li_width; 
                vars.curr_index += 1; 
                check_disabled(); 
            }
            else if (vars.curr_index < (vars.max_index - 1))
            {
                new_left = vars.curr_leftpos - (opt.num * vars.li_width); 
                vars.curr_index += 1; 
                $(vars.r_arrow).removeClass('rtr_carousel_disabled'); 
                check_disabled(); 
            }
            else if (vars.curr_index == vars.max_index) {
                check_disabled(); 
                return false; 
            }
            vars.animating = true; 
            vars.ul.animate({'left': new_left}, 500, function(){
                vars.curr_leftpos = new_left; 
                vars.animating = false; 
            });
            if (typeof(callback) == 'function') {
                callback.call(this, vars); 
            }
            $(self1).trigger('rtr_carousel_next', [this, vars]); 
            return this;
        }

        this.prev = function(callback){
            var new_left; 
            // if the carousel is currently animating do not advance. 
            if (vars.animating) {
                return false; 
                check_disabled(); 
            }
            // if this is the last scroll, do not scroll the entire opt.num in case it goes too far. 
            if (vars.curr_index == 1)
            {
                new_left = 0; 
                vars.curr_index -= 1;  
                // you are now at the end of the carousel, disable next scrolling. 
                check_disabled(); 
            }
            else if (vars.curr_index > 1)
            {
                new_left = vars.curr_leftpos + (opt.num * vars.li_width); 
                vars.curr_index -= 1; 
                vars.disable_next = false; 
                check_disabled(); 
            }
            else if (vars.curr_index == 0) {
                check_disabled(); 
                return false; 
            }
            vars.animating = true; 
            vars.ul.animate({'left': new_left}, 500, function(){
                vars.curr_leftpos = new_left; 
                vars.animating = false; 
            });
            if (typeof(callback) == 'function') {
                callback.call(this, vars); 
            }
            $(self1).trigger('rtr_carousel_next', [this, vars]); 
            return this;
        }

        function check_disabled() {
            // first, if the carousel has less than the number of items in the view port, both should be disabled: 
            if (vars.curr_total <= vars.viewport) {
                $(vars.r_arrow).addClass('rtr_carousel_disabled'); 
                $(vars.l_arrow).addClass('rtr_carousel_disabled'); 
            } else {
                if (vars.curr_index == vars.max_index) {
                    // you are now at the end of the carousel, disable next scrolling. 
                    $(vars.r_arrow).addClass('rtr_carousel_disabled'); 
                    $(vars.l_arrow).removeClass('rtr_carousel_disabled'); 
                } else if (vars.curr_index == 0){
                    $(vars.r_arrow).removeClass('rtr_carousel_disabled'); 
                    $(vars.l_arrow).addClass('rtr_carousel_disabled'); 
                } else {
                    $(vars.r_arrow).removeClass('rtr_carousel_disabled'); 
                    $(vars.l_arrow).removeClass('rtr_carousel_disabled'); 
                }
            }
        }

        this.get_instance = function(){
            return self;
        }

        // retrn the carousel's internal variables.  very useful if you need, for example, the carousel's current index
        this.get_variables = function(){
            return vars;
        }

        // Determine whether there are enough li elements left to scroll without hitting the end of the carousel...
/*        function position_helper(prev_next) {
            var scroll = true; 
            if (prev_next = 'next') {
                // Note to future self who will have to read this: There are 2 numbers that determine whether scrolling will exceed number of li elems: 
                // 1- vars.curr_total - viewport.  The total number of li elems minus the number in the viewport. 
                // 2- vars.curr_index + opt.num.  The current position (left) plus the number to be scrolled. 
                var viewport = Math.round(vars.viewport_width / vars.li_width); 
                if (prev_next = 'next') {
                    var safe = (vars.curr_total - viewport) - (vars.curr_index + opt.num); 
                    // If safe > 0 there is enough room to scroll.  If not Scrolling will cause you to hit the end of the carousel. 
                    safe > 0 ? scroll = true : scroll = false; 
                }
                else if (prev_next = 'prev') {
                    var safe = (vars.curr_index + opt.num) - (vars.curr_total - viewport); 
                    safe > 0 ? scroll = true : scroll = false; 
                }
                else {
                    throw "no arguments provided for private function position_helper";
                }
            }
            return scroll; 
        }*/

    return this; 
    });
};


/*
 *@function rtr_progressive_carousel - create a progressively loading carousel
 *@note only call this plugin on 1 element at a time. 
 *
 * NOTE: this plugin accepts a json object that describes further li elements, a template
 * parameter, which it will use Underscore.js to pass json into and add to the carousel
 * 
 * Since you have to explicitly pass in the json you want to use for each carousel, you can 
 * only call this plugin on one carousel, so do not use a class name, use ID instead. 
 * 
 * ALSO: the json you pass in must be in the form of a plain old array.  Becasue the plugin
 * doesn't know anything about the structure of your json, make sure the objects that describe 
 * your <li> elements are not keyed on anything. 
 * 
 */
$.fn.rtr_progressive_carousel = function(args, li_template, json) {
        var self = this; 
        /* NOTE: since the carousel plugin returns an array of carousels, and we only call 
         * this plugin on 1 element at a time, the carousel will always be the 0th carousel. 
         */
        var carousel = $(this).rtr_carousel(args)[0]; 

        $(carousel).bind('rtr_carousel_next', function(event, obj, vars){
            carousel.check_for_items(carousel); 
        }); 


        // check that the carousel has enough <il> elements to keep ahead of the curve. 
        carousel.check_for_items = function() {
            var carousel_params = carousel.get_variables(); 
            var curr_index = carousel_params.curr_index; 
            var scroll_num = carousel_params.scroll_num; 
            var curr_total = $(carousel).find('li').length; 
            if (curr_total - (curr_index * scroll_num) < ((scroll_num * 2) + 1)) {
                this.render_panel(curr_total, scroll_num); 
            }
        }

        // render the next bank of <li> elements. 
        carousel.render_panel = function(curr_total, scroll_num) {
            var li_to_render = []; 
            for (var i = 0; i<= (scroll_num - 1); i++) {
                if (json[curr_total+i]) {
                    li_to_render.push(json[curr_total + i]); 
                }
            }
            if (li_to_render.length > 0) {
                _.each(li_to_render, function(val,key){
                    var li = _.template($(li_template).html(), val); 
                    carousel.add_node(li, false); 
                    $(document).trigger('added_progressive_carousel_li', [li]); 
                });
            }
        }
        return carousel; 
} 



// EXAMPLES:::::: 

// Build one instance of a carousel. 
// var car1 = $('.carousel')[0].rtr_carousel();

// The function get_instance() returns the original array of dom elements that the your function was called on. 
// NOTE: this would otherwise be difficult to do because calling .rtr_carousel() again would just build another carousel object. 
// var car1 = $('.carousel')[0].rtr_carousel();
// car1.get_instance(); 

// *** OR try this: ***
// var carousels = $('.carousel').rtr_carousel(); //binds to all elements matching '.carousel' selector.  Let's assuem for arguments sake this returns an array of 2 carousels. 
// var car1 = carousels[0]; // the first of the 2 carousels
// Using the built in callback option, you can find the instance of all carousels created when the plugin was first called and do something to all of them. 
// car1.stop(function(arg){
// 		var all_carousels = car1.get_instance(); 
// 		all_carousels.hide(); 
// });

// NOTE: The reason that I provide methods structured in this way is so that you never have to call the .rtr_carousel() function more that 1x.  
// Calling .rtr_carousel() on a set of matched elements more than 1x might cause UI bindings to bind multiple times. 
// The proper way to use the plugin is to store the set of matched elements in a variable and call the plugin's sub methods on the variable as illustrated. 

// The reason to encapsulate the instances of your carousel in a variable as above is to enable you to control each instance individually.  
// For example 
// var car1 = $('.carousel')[0].rtr_carousel();
// var car2 = $('.carousel')[1].rtr_carousel();

// car1.stop(); 

// If there are going to be a lot of carousels on the page and you don't want to call each one individually, you can build them all at the same time and 
// access individual insatances using an index, or the .eq() method like so: 
// var carousels = $('.carousel').rtr_carousel(); 
// carousels[0].stop(); 

// EVENTS AND CALLBACKS!!!

// Callbacks: 
// As noted above, each of the methods supplies the user with a callback.  The callback has an optional argument peramater that gives you access to rtr_carousel's internal values. 
// These include things like the width of the ul, the selectors for the left and right arrows, etc. 
// Example: 
// $('.carousel').rtr_carousel(function(arg){
//     for (i in arg) {
//         alert(arg[i]); // alerts internal carousel peramaters. 
//     }
// }); 

// Events: 
// Methods also trigger events that you can listen on.  All events are fired from the document obect. 
// There are 2 arguments passed to JQuery's bind callback function.  
// 2 arguments passed: 1- The object, 2- rtr_carousel's internal variables. 
// Example: 
// $(document).ready(function(){
//      var carousel = $('.carousel').rtr_carousel(); 
//      carousel[0].stop();
// });
// $(document).bind('rtr_carousel_stop', function(event, obj, vars){ // Check out the peramaters passed into the callback. 
//      console.log(obj); 
//      console.log(vars); 
// }); 
// 
// 

/*
Things that have yet to be developed, all up in hizzy? 

- create animation
- add math for when you are at the end of your carousel. 
- add window.resize eventz
*/


