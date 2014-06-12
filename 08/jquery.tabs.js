(function($){
    $.fn.tabs = function(options) {
        var defaults = {switchingMode: 'click'};
        var opts = $.extend({}, defaults, opts);
        var obj = $(this);
        var clickIndex = 0;

        obj.addClass("tabsDiv");
        $("ul li", obj).not(':first').addClass("tabsUnSelectedLi");
        $("ul li:first", obj).addClass("tabsSelectedLi");
        $("div", obj).not(':first').hide();
        
        $('ul li', obj).bind(opts.switchingMode, function(){
            if (clickIndex != $("ul li", obj).index($(this))) {
                clickIndex = $("ul li", obj).index($(this));
                $('.tabsSelectedLi', obj).removeClass("tabsSelectedLi").addClass("tabsUnSelectedLi");
                $(this).removeClass("tabsUnSelectedLi").addClass("tabsSelectedLi");
            }

            var divid = $("a", $(this)).attr("href").substr(1);
            $("div", obj).hide();
            $("#" + divid, obj).show();
        });
    }
})(jQuery);