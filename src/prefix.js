(function() {
	var init = function($, commonmark) {
		var reader = commonmark.Parser();
		var writer = commonmark.HtmlRenderer();

		var convert = function (str) { return writer.render(reader.parse(str)); };