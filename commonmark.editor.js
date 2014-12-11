define(['jquery', 'commonmark', 'css!commonmark.editor'], function ($, commonmark) {
	var reader = commonmark.DocParser();
	var writer = commonmark.HtmlRenderer();

	var convert = function (str) { return writer.render(reader.parse(str)); };

	var header = function(options) {
		var self = this;
		var events = { preview: 'cm-editor-header-preview', edit: 'cm-editor-header-edit' };

		/* Public API */
		self.element = $('<div class="header"></div>');

		// Events
		self.on = {
			preview: function(callback) { self.element.on(events.preview, callback); },
			edit: function(callback) { self.element.on(events.edit, callback); }
		};

		self.trigger = {
			preview: function(data) { self.element.trigger(new $.Event(events.preview, data)); },
			edit: function(data) { self.element.trigger(new $.Event(events.edit, data)); }
		};

		/* Constructor */

		var tabs = $('<ul class="tabs"></ul>')
			.append(
				$('<li></li>').append(
					$('<a href="#" class="active">Edit</a>').click(function() {
						self.trigger.edit({ element: this });

						return false;
					})
				)
			)
			.append(
				$('<li></li>').append(
					$('<a href="#">Preview</a>').click(function() {
						self.trigger.preview({ element: this });

						return false;
					})
				)
			);

		if(!options.header)
			self.element.addClass('transparent');

		self.element.append(tabs);

		// Tie up internal events
		var click = function(data) {
			self.element.find('li a.active').removeClass('active');
			$(data.element).addClass('active');
		};

		self.on.edit(click);
		self.on.preview(click);
	}

	$.fn.commonMarkEditor = function(options) {
		options = $.extend({
			// Initial values
			text: '', title: '',

			header: true,

			// Events
			change: null
		}, options);

		this.each(function(index, item) {
			var editorText = '';

			// Header
			var head = new header(options);

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

			// Tie into some events
			head.on.edit(function() { preview.hide(); editor.show(); });
			head.on.preview(function() { preview.show(); editor.hide(); });

			// Add everything to the parent
			$(item).addClass('commonmark-editor')
				.append(head.element)
				.append(editor)
				.append(preview);
		});

		return this;
	};
});
