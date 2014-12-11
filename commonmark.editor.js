define(['jquery', 'commonmark', 'css!commonmark.editor'], function ($, commonmark) {
	var reader = commonmark.DocParser();
	var writer = commonmark.HtmlRenderer();

	var convert = function (str) { return writer.render(reader.parse(str)); };

	var EditorHeader = function(options) {
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

	var Editor = function(element, options) {
		var self = this;
		var text = '';

		/* Public API */
		self.element = element;

		/* Constructor */
		var header = new EditorHeader(options);
		var textarea = $('<textarea class="form-control"></textarea>');
		var editor = $('<div class="editor-pane"></div>').append(textarea);
		var preview = $('<div class="editor-pane preview"></div>').hide();

		// Wire up some events
		var onChange = function() {
			var value = $(this).val();

			if(value === text)
				return;

			text = value;
			preview.html(convert(text));
		};

		header.on.edit(function() { preview.hide(); editor.show(); });
		header.on.preview(function() { preview.show(); editor.hide(); });
		textarea.change(onChange).keydown(onChange).keyup(onChange);

		// Add all the elements
		$(self.element).addClass('commonmark-editor')
			.append(header.element)
			.append(editor)
			.append(preview);
	}

	$.fn.commonMarkEditor = function(options) {
		options = $.extend({
			// Initial values
			text: '',

			header: true,

			// Events
			change: null
		}, options);

		var editors = [];

		this.each(function(index, item) { editors.push(new Editor(item, options)); });

		return editors;
	};
});
