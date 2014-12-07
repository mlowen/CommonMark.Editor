define(['jquery', 'commonmark'], function ($, commonmark) {
	var reader = commonmark.DocParser();
	var writer = commonmark.HtmlRenderer();

	var convert = function (str) { return writer.render(reader.parse(str)); };

	$.fn.commonMarkEditor = function(options) {
		this.each(function(index, item) {
			var text = '';

			// Preview
			var preview = $('<div class="preview"></div>');

			// The editor component
			var onChange = function() {
				var newValue = $(this).val();

				if(newValue === text)
					return;

				text = newValue;
				preview.html(convert(text));
			};

			var textarea = $('<textarea class="form-control"></textarea>')
				.change(onChange)
				.keydown(onChange)
				.keyup(onChange);

			var editor = $('<div class="editor"></div>').append(textarea);

			$(item).addClass('commonmark-editor')
				.append(editor)
				.append(preview);
		});
	};
});
