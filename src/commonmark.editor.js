(function() {
	var init = function($, commonmark) {
		var reader = commonmark.DocParser();
		var writer = commonmark.HtmlRenderer();

		var convert = function (str) { return writer.render(reader.parse(str)); };

		var EditorHeader = function(options) {
			var self = this;
			var events = { preview: 'cm-editor-header-preview', edit: 'cm-editor-header-edit' };

			/* Public API */
			self.element = $('<div class="cm-editor-header"></div>');

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

		var EditorContent = function() {
			var self = this;
			var state = null;
			var events = { change: 'cm-editor-content-change' };

			var textarea = $('<textarea class="form-control"></textarea>');
			var preview = $('<div class="preview"></div>');

			/* Public API */
			self.states = { edit: 1, preview: 2 }
			self.element = $('<div class="cm-editor-content"></div>')
				.append(textarea)
				.append(preview);

			// Methods
			self.state = function(s) {
				if(typeof s === 'undefined') return state;
				if(s == state) return;

				state = s;

				if(state == self.states.edit) {
					textarea.show();
					preview.hide();
				} else {
					textarea.hide();
					preview.show();
				}
			};

			self.text = function(text) {
				if(typeof text === 'undefined') return textarea.val();

				textarea.val(text);
				textarea.change();
			}

			// Events
			self.on = { change: function(callback) { self.element.on(events.change, callback); } };
			self.trigger = { change: function(data) { self.element.trigger(new $.Event(events.change, data)); } };

			// Construct

			var onChange = function() {
				var text = textarea.val();

				preview.html(convert(text));
				self.trigger.change({ text: text });
			};

			textarea.change(onChange).keydown(onChange).keyup(onChange);

			self.state(self.states.edit);
		}

		var EditorFooter = function() {
			var self = this;
			var revert = $('<button class="btn btn-default">Revert</button>');
			var save = $('<button class="btn btn-primary pull-right">Save</button>');

			/* Public API */
			self.element = $('<div class="cm-editor-footer"></div>');

			// Methods

			// Events

			/* Construct */
			self.element.append(revert).append(save);
		};

		var Editor = function(element, options) {
			var self = this;
			var text = '';

			var events = { change: 'cm-editor-changed' };

			/* Public API */
			self.element = $(element);

			// Methods
			self.text = function(value) {
				if(typeof value === 'undefined')
					return text;

				if(text === value) return;

				text = value;
				content.text(text);
				self.trigger.change({ text: text });
			};

			// Events

			self.on = { change: function(callback) { self.element.on(events.change, callback); } };
			self.trigger = { change: function(data) { self.element.trigger(new $.Event(events.change, data)); } };

			/* Constructor */
			var header = new EditorHeader(options);
			var content = new EditorContent();
			var footer = options.save ? new EditorFooter() : null;

			header.on.edit(function() { content.state(content.states.edit); });
			header.on.preview(function() { content.state(content.states.preview); });

			content.on.change(function(data) { self.text(data.text); });

			// Add all the elements
			var body = $('<div class="cm-editor-body"></div>').append(content.element);

			if(footer != null)
				body.append(footer.element);

			self.element.addClass('commonmark-editor')
				.append(header.element)
				.append(body);

			self.text(options.text);
		}

		$.fn.commonMarkEditor = function(options) {
			options = $.extend({ text: '', header: true, save: false }, options);

			return this.map(function(index, item) { return new Editor(item, options); });
		};
	};

	if(typeof define === 'function' && define.amd)
		define([ 'jquery', 'commonmark' ], init);
	else
		init(jQuery, commonmark)
})();
