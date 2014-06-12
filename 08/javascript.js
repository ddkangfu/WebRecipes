(function($) {
    $.fn.toggleExpandCollapse = function(event) {
        event.stopPropagation();
        if (this.find('ul').length > 0) {
            event.preventDefault();
            this.toggleClass('collapsed').toggleClass('expanded').find('> ul').slideToggle('normal');
        }
        return this;
    }
})(jQuery);

function prependToggleAllLinks() {
    var container = $('<div>').attr('class', 'expand_or_collapse_all');
    container.append($('<a>').attr('href', '#').html('Expand all').click(handleExpandAll)).append(' | ').append($('<a>').attr('href', '#').html('Collapse all').click(handleCollapseAll));
    $('ul.collapsible').prepend(container);
}

function handleExpandAll(event) {
    $('ul.collapsible li.collapsed').toggleExpandCollapse(event);
}

function handleCollapseAll(event) {
    $('ul.collapsible li.expanded').toggleExpandCollapse(event);
}

function initializeCollapsibleList() {
    $('ul.collapsible li').click(function(event) {
        $(this).toggleExpandCollapse(event);
    });
    $('ul.collapsible li:not(.expanded) > ul').hide();
    $('ul.collapsible li ul').parent(':not(.expanded)').addClass('collapsed');
}

$(document).ready(function() {
    initializeCollapsibleList();
    prependToggleAllLinks();
});