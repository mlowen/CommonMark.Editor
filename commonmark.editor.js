define(['jquery', 'commonmark', 'css!commonmark.editor'], function ($, commonmark) {
	var reader = commonmark.DocParser();
	var writer = commonmark.HtmlRenderer();

	var convert = function (str) { return writer.render(reader.parse(str)); };

	$.fn.commonMarkEditor = function(options) {
		$.extend(options, {
			// Initial values
			text: '', header: '',

			// Events
			change: null
		});

		this.each(function(index, item) {
			var editorText = '';

			// Header
			var header = $('<div class="header"></div>');
			var tabs = $('<ul class="tabs"></ul>')
				.append(
					$('<li></li>').append(
						$('<a href="#" class="active">Edit</a>').click(function() {
							header.find('li a.active').removeClass('active');
							$(this).addClass('active');

							preview.hide();
							editor.show();

							return false;
						})
					)
				)
				.append(
					$('<li></li>').append(
						$('<a href="#">Preview</a>').click(function() {
							header.find('li a.active').removeClass('active');
							$(this).addClass('active');

							editor.hide();
							preview.show();

							return false;
						})
					)
				);

			header.append(tabs);

			// Preview
			var preview = $('<div class="editor-pane preview"></div>').hide();

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

			var editor = $('<div class="editor-pane"></div>').append(textarea);

			$(item).addClass('commonmark-editor')
				.append(header)
				.append(editor)
				.append(preview);
		});

		return this;
	};
});
