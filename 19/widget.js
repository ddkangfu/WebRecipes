(function(){
	var jQuery;
	if (window.jQuery === undefined || window.jQuery.fn.jQuery !== "1.7") {
		var jquery_script = document.createElement('script');
		jquery_script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.min.js");
		jquery_script.setAttribute("type", "text/javascript");
		jquery_script.onload = loadjQuery;
		jquery_script.onreadystatechange = function() {
			if (this.readyState == 'complete' || this.readyState == 'loaded') {
				loadJquery();
			}
		};
		(document.getElementByTagName('head')[0] || document.documentElement).appendChild(jquery_script);
	} else {
		jQuery = window.jQuery;
		widget();
	}
})();

function loadjQuery() {
	jQuery = window.jQuery.noConflict(true);
	widget();
}

function widget() {
	jQuery(document).ready(function($){
		var account = "rails";
		var project = "rails";
		var branch = "master";

		$.ajax({
			url: 'http://github.com/api/v2/json/commits/list/' + account + '/' + project + '/' + branch,
			dataType: 'jsonp',
			success: function(data) {
				$.each(data.commits, function(i, commit) {
					var commit_div = document.createElement('div');
					commit_div.setAttribute('class', 'commit');
					commit_div.setAttribute('id', 'commit_' + commit.id);
					$('#widget').append(commit_div);
					$('#commit_' + commit.id).append("<h3>" + new Date(commit.committed_date) + "</h3><p>" + commit.message + "</p><p>By " + commit.committer.login + "</p>");
				});
			}
		});

		var css = $("<link>", {
			rel: "stylesheet",
			type: "text/css",
			href: "widget.css"
		});

		css.appendTo('head');
	});
}