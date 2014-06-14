$(document).keydown(function(e) {
	if ($(document.activeElement)[0] === $(document.body)[0]) {
		switch(e.keyCode) {
			case 74:
				scrollToNext();
				break;
			case 75:
				scrollToPrevious();
				break;
			case 39:
				loadNextPage();
				break;
			case 37:
				loadPreviousePage();
				break;
			case 191:
				if (e.shiftKey) {
					$('#search').focus().val('');
					return false;
				}
				break;
		}
	}
});

$(function() {
	current_entry = -1;
});

function scrollToNext() {
	if ($('.entry').size() > current_entry + 1) {
		current_entry++;
		scrollToEntry(current_entry);
	}
}

function scrollToEntry(entry_index) {
	$('html, body').animate({scrollTop: $('#' + $('.entry')[entry_index].id).offset().top, 'slow'});
}

function scrollToPrevious() {
	if (current_entry  > 0) {
		current_entry--;
		scrollToEntry(current_entry);
	}	
}

function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) 
		return unescape(r[2]);
	return null; 
}

function getCurrentPageNumber() {
	return (getQueryString('page') != null) ? parseInt(getQueryString('page')) : 1;
}

function loadNextPage() {
	page_number = getCurrentPageNumber();
	url = window.location.href;
	if (url.indexOf('page=') != -1) {
		window.location.href = replacePageNumber(page_number);
	} else if (url.indexOf('?') != -1) {
		window.location.href += "&page=" + page_number;
	} else {
		window.location.href += "?page=" + page_number;
	}
}

function replacePageNumber(page_number) {
	return window.location.href.replace(/page=(\d)/, 'page=' + page_number);
}

function loadPreviousePage() {
	page_number = getCurrentPageNumber();
	if (page_number > 0) {
		window.location.href = replacePageNumber(page_number);
	}
}