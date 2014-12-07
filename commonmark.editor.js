define(['jquery', 'commonmark'], function ($, commonmark) {
	var reader = commonmark.DocParser();
	var writer = commonmark.HtmlRenderer();

	var convert = function (str) { return writer.render(reader.parse(str)); };

	$.fn.commonMarkEditor = function(options) {
		this.each(function(index, item) {
			// Preview
			var preview = $('<div class="preview"></div>');

			// The editor component
			var textarea = $('<textarea class="form-control"></textarea>');
			var editor = $('<div class="editor"></div>')
				.append(textarea);

			$(item).addClass('commonmark-editor')
				.append(editor)
				.append(preview);
		});
	};
});
