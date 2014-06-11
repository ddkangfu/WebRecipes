$(function(){
    styleExamples();
});

function styleExamples() {
    $('div.examples').each(function() {
        createTabs(this);
        activeTabs(this);
        displayTab($(this).children('ul.tabs').children().first());
    });
}

function createTabs(container) {
    $(container).prepend('<ul class="tabs"></ul>');
    $(container).children("div.example").each(function(){
        var exampleTitle = $(this).attr('class').replace('example', '');
        $(container).children("ul.tabs").append('<li class="tab ' + exampleTitle + '">' + exampleTitle + '</li>');
    });
}

function displayTab(elemment) {
    tabTitle = $(elemment).attr('class').replace('tab', '').replace('selected', '').trim();
    container = $(elemment).parent().parent();
    container.children('div.example').hide();
    container.children('ul.tabs').children('li').removeClass('selected');

    container.children('div.' + tabTitle).slideDown('fase');
    $(elemment).addClass('selected');
}

function activeTabs(elemment) {
    $(elemment).children('ul.tabs').children('li').click(function(){
        displayTab(this);
    });
}