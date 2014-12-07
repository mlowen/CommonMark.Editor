define(['jquery', 'commonmark', 'css!commonmark.editor'], function ($, commonmark) {
	var reader = commonmark.DocParser();
	var writer = commonmark.HtmlRenderer();

	var convert = function (str) { return writer.render(reader.parse(str)); };

	$.fn.commonMarkEditor = function(options) {
		$.extend(options, {
			// Initial values
			text: '', header: '',

			// Events
			save: null, change: null
		});

		this.each(function(index, item) {
			var editorText = '';

			// Header
			var header = $('<ul class="header"></ul>')
				.append('<li><a href="#">Edit</a></li>')
				.append('<li><a href="#">Preview</a></li>');

			// Preview
			var preview = $('<div class="preview"></div>');

			// Editor
			var onChange = function() {
				var newValue = $(this).val();

				if(newValue === editorText)
					return;

				editorText = newValue;
				preview.html(convert(editorText));
			};

			var textarea = $('<textarea class="form-control"></textarea>')
				.change(onChange)
				.keydown(onChange)
				.keyup(onChange);

			var save = $('<button class="btn btn-success pull-right">Save</button>')
				.click(function() {

				});

			var editor = $('<div class="editor"></div>')
				.append(textarea)
				.append(save);

			$(item).addClass('commonmark-editor')
				.append(header)
				.append(editor)
				.append(preview);
		});

		return this;
	};
});
