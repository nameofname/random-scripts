$.fn.rtr_carousel = function (user_options, callback) {
    var self = this;
    return this.each(function (key, elem) {
        var optn = {
            num: 2,
            left: 'rtr_carousel_prev',
            right: 'rtr_carousel_next',
            fluid: false
        }, opt = $.extend(optn, user_options);
        var self1 = this;
        var vars = {
            init_flag: false,
            l_arrow: $('<div>').attr('class', opt.left),
            r_arrow: $('<div>').attr('class', opt.right),
            ul: $(this).find('ul'),
            text: $(this).text(),
            count: $(this).find('ul li').length,
            width: null,
            viewport_width: null,
            viewport: null,
            li_width: null,
            curr_total: null,
            curr_index: 0,
            max_index: null,
            curr_leftpos: null,
            animating: false,
            scroll_num: opt.num
        }
        if (opt.fluid) {
            init_fluid();
        }
        init();

        function init() {
            if (!vars.int_flag) {
                div_stylz = {
                    'overflow': 'hidden',
                    'position': 'relative'
                };
                ul_stylz = {
                    'position': 'relative'
                };
                li_stylz = {
                    'float': 'left'
                };
                $(self1).css(div_stylz);
                vars.ul.css(ul_stylz);
                vars.ul.find('li').css(li_stylz);
                (vars.ul.css('left') == 'auto') ? vars.curr_leftpos = 0 : vars.curr_leftpos = parseInt(vars.ul.css('left').split('px')[0]);
                vars.init_flag = true;
                $(self1).before(vars.l_arrow);
                $(self1).after(vars.r_arrow);
                $(vars.r_arrow).click(function () {
                    self1.next();
                });
                $(vars.l_arrow).click(function () {
                    self1.prev();
                });
            }
            var one_li = vars.ul.find('li')[0];
            vars.li_width = parseInt($(one_li).width());
            vars.curr_total = vars.ul.find('li').length;
            vars.width = (vars.curr_total + 1) * vars.li_width;
            vars.ul.width(vars.width);
            vars.viewport_width = $(self1).width();
            vars.viewport = Math.floor(vars.viewport_width / vars.li_width);
            vars.max_index = Math.ceil((vars.curr_total - vars.viewport) / opt.num);
            check_disabled();
        }

        function init_fluid() {
            $(window).resize(function () {});
        }
        this.add_node = function (node, inside_viewport, callback) {
            var index = vars.curr_leftpos / (vars.li_width * -1);
            if (!inside_viewport) {
                $(vars.ul).append(node);
            } else {
                $(vars.ul).find('li').eq(index).before(node);
            }
            init();
            $(node).show('slow');
            if (typeof (callback) == 'function') {
                callback.call(this, vars);
            }
            $(self1).trigger('rtr_carousel_addnode', [this, vars]);
            return this;
        }
        this.next = function (callback) {
            var new_left;
            if (vars.animating) {
                return false;
            }
            if (vars.curr_index == (vars.max_index - 1)) {
                new_left = -(vars.curr_total - vars.viewport) * vars.li_width;
                vars.curr_index += 1;
                check_disabled();
            } else if (vars.curr_index < (vars.max_index - 1)) {
                new_left = vars.curr_leftpos - (opt.num * vars.li_width);
                vars.curr_index += 1;
                $(vars.r_arrow).removeClass('rtr_carousel_disabled');
                check_disabled();
            } else if (vars.curr_index == vars.max_index) {
                check_disabled();
                return false;
            }
            vars.animating = true;
            vars.ul.animate({
                'left': new_left
            }, 500, function () {
                vars.curr_leftpos = new_left;
                vars.animating = false;
            });
            if (typeof (callback) == 'function') {
                callback.call(this, vars);
            }
            $(self1).trigger('rtr_carousel_next', [this, vars]);
            return this;
        }
        this.prev = function (callback) {
            var new_left;
            if (vars.animating) {
                return false;
                check_disabled();
            }
            if (vars.curr_index == 1) {
                new_left = 0;
                vars.curr_index -= 1;
                check_disabled();
            } else if (vars.curr_index > 1) {
                new_left = vars.curr_leftpos + (opt.num * vars.li_width);
                vars.curr_index -= 1;
                vars.disable_next = false;
                check_disabled();
            } else if (vars.curr_index == 0) {
                check_disabled();
                return false;
            }
            vars.animating = true;
            vars.ul.animate({
                'left': new_left
            }, 500, function () {
                vars.curr_leftpos = new_left;
                vars.animating = false;
            });
            if (typeof (callback) == 'function') {
                callback.call(this, vars);
            }
            $(self1).trigger('rtr_carousel_next', [this, vars]);
            return this;
        }

        function check_disabled() {
            if (vars.curr_total <= vars.viewport) {
                $(vars.r_arrow).addClass('rtr_carousel_disabled');
                $(vars.l_arrow).addClass('rtr_carousel_disabled');
            } else {
                if (vars.curr_index == vars.max_index) {
                    $(vars.r_arrow).addClass('rtr_carousel_disabled');
                    $(vars.l_arrow).removeClass('rtr_carousel_disabled');
                } else if (vars.curr_index == 0) {
                    $(vars.r_arrow).removeClass('rtr_carousel_disabled');
                    $(vars.l_arrow).addClass('rtr_carousel_disabled');
                } else {
                    $(vars.r_arrow).removeClass('rtr_carousel_disabled');
                    $(vars.l_arrow).removeClass('rtr_carousel_disabled');
                }
            }
        }
        this.get_instance = function () {
            return self;
        }
        this.get_variables = function () {
            return vars;
        }
        return this;
    });
};
$.fn.rtr_progressive_carousel = function (args, li_template, json) {
    var self = this;
    var carousel = $(this).rtr_carousel(args)[0];
    $(carousel).bind('rtr_carousel_next', function (event, obj, vars) {
        carousel.check_for_items(carousel);
    });
    carousel.check_for_items = function () {
        var carousel_params = carousel.get_variables();
        var curr_index = carousel_params.curr_index;
        var scroll_num = carousel_params.scroll_num;
        var curr_total = $(carousel).find('li').length;
        if (curr_total - (curr_index * scroll_num) < ((scroll_num * 2) + 1)) {
            this.render_panel(curr_total, scroll_num);
        }
    }
    carousel.render_panel = function (curr_total, scroll_num) {
        var li_to_render = [];
        for (var i = 0; i <= (scroll_num - 1); i++) {
            if (json[curr_total + i]) {
                li_to_render.push(json[curr_total + i]);
            }
        }
        if (li_to_render.length > 0) {
            _.each(li_to_render, function (val, key) {
                var li = _.template($(li_template).html(), val);
                carousel.add_node(li, false);
                $(document).trigger('added_progressive_carousel_li', [li]);
            });
        }
    }
    return carousel;
}
