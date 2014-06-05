$(function() {
    $('#slideshow').cycle({fx: 'fade'});
    setupButtons();
});

var setupButtons = function() {
    var slideshow = $('#slideshow');

    var pause = $('<span id="pause">Pause</span>');
    pause.click(function() {
        slideshow.cycle('pause');
        toggleControls();
    }).insertAfter(slideshow);

    var resume = $('<span id="resume">Resume</span>');
    resume.click(function(){
        slideshow.cycle('resume');
        toggleControls();
    }).insertAfter(slideshow);

    resume.toggle();
}

var toggleControls = function() {
    $('#pause').toggle();
    $('#resume').toggle();
}