(function() {
	var init = function($, commonmark) {
		var reader = commonmark.DocParser();
		var writer = commonmark.HtmlRenderer();

		var convert = function (str) { return writer.render(reader.parse(str)); };

		var EditorHeader = function(options) {
			var self = this;
			var events = { preview: 'cm-editor-header-preview', edit: 'cm-editor-header-edit', toggle: 'cm-editor-header-toggle' };

			/* Public API */
			self.element = $('<div class="cm-editor-header"></div>');

			// Events
			self.on = {
				preview: function(callback) { self.element.on(events.preview, callback); },
				edit: function(callback) { self.element.on(events.edit, callback); },
				toggle: function(callback) { self.element.on(events.toggle, callback); }
			};

			self.trigger = {
				preview: function(data) { self.element.trigger(new $.Event(events.preview, data)); },
				edit: function(data) { self.element.trigger(new $.Event(events.edit, data)); },
				toggle: function(data) { self.element.trigger(new $.Event(events.toggle)); }
			};

			self.toggle = function() {
				if(options.toggle) {
					if(glyph.hasClass(edit)) {
						glyph.removeClass(edit).addClass(cancel);
					} else {
						glyph.removeClass(cancel).addClass(edit);
					}
				}

				if(title) title.toggle();

				tabs.toggle();
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

			if(options.inline) {
				var title = null;

				if(options.toggle) {
					var edit = 'glyphicon-pencil';
					var cancel = 'glyphicon-remove';

					var glyph = $('<span class="glyphicon"></span>').addClass(edit);
					var toggle = $('<a href="#" class="pull-right toggle"></a>').append(glyph);

					toggle.click(function(e) {
						e.preventDefault();
						self.trigger.toggle();
					});

					self.element.append(toggle);
				}

				tabs.hide();

				if(options.title) {
					title = $('<strong class="title"></strong>').text(options.title);
					self.element.append(title);
				}
			}

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

				// Lets not cause unnecessary resetting of text and fire unneeded events.
				if(textarea.val() === text)
					return;

				textarea.val(text);
				textarea.change();
			}

			self.show = function() { self.element.show(); };
			self.hide = function() { self.element.hide(); };
			self.toggle = function() { self.element.toggle(); };

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
			var property = 'disabled';
			var revert = $('<button class="btn btn-default">Revert changes</button>');
			var save = $('<button class="btn btn-success pull-right">Save</button>');
			var events = { save: 'cm-editor-footer-save', revert: 'cm-editor-footer-revert' };

			/* Public API */
			self.element = $('<div class="cm-editor-footer"></div>');

			// Methods
			self.disable = function() {
				save.prop(property, true);
				revert.prop(property, true);
			};

			self.enable = function() {
				save.prop(property, false);
				revert.prop(property, false);
			};

			self.show = function() { self.element.show(); };
			self.hide = function() { self.element.hide(); };
			self.toggle = function() { self.element.toggle(); };

			// Events
			self.on = {
				save: function(callback) { self.element.on(events.save, callback); },
				revert: function(callback) { self.element.on(events.revert, callback); },
			};

			self.trigger = {
				save: function() { self.element.trigger(new $.Event(events.save)); },
				revert: function() { self.element.trigger(new $.Event(events.revert)); },
			};

			/* Construct */
			save.click(function(e) {
				e.preventDefault();
				self.trigger.save();
			});

			revert.click(function(e) {
				e.preventDefault();
				self.trigger.revert();
			});

			self.element.append(revert).append(save);
			self.disable();
		};

		var Editor = function(element, options) {
			var self = this;
			var text = '';

			var events = { change: 'cm-editor-changed' };

			/* Utility functions */
			var toggleInline = function() {
				content.toggle();
				inlineContent.toggle();
				header.toggle();

				if(options.save)
					footer.toggle();
			};

			/* Public API */
			self.element = $(element);

			// Methods
			self.text = function(value) {
				if(typeof value === 'undefined')
					return text;

				if(text === value) return;

				text = value;
				content.text(text);

				if(inlineContent)
					inlineContent.html(convert(text));

				self.trigger.change({ text: text });
			};

			self.inline = function(value) {
				if(!options.inline)
					return false;

				var isInline = inlineContent.is(':visible');

				if(typeof value === 'undefined')
					return isInline;

				if(isInline != value)
					toggleInline();
			};

			// Events

			self.on = { change: function(callback) { self.element.on(events.change, callback); } };
			self.trigger = { change: function(data) { self.element.trigger(new $.Event(events.change, data)); } };

			/* Constructor */
			var header = new EditorHeader(options);
			var content = new EditorContent();
			var footer = options.save ? new EditorFooter() : null;
			var inlineContent = options.inline ? $('<div class="inline-content"></div>') : null;

			// Subscribe to events

			header.on.edit(function() { content.state(content.states.edit); });
			header.on.preview(function() { content.state(content.states.preview); });

			content.on.change(function(data) {
				if(options.save) {
					if(data.text === text) footer.disable();
					else footer.enable();
				} else {
					self.text(data.text);
				}
			});

			if(options.save) {
				footer.on.save(function() { self.text(content.text()); });
				footer.on.revert(function() { content.text(self.text()); });
			}

			if(options.inline) {
				content.hide();

				if(options.save)
					footer.hide();

				header.on.toggle(toggleInline);
			}

			// Add all the elements
			var body = $('<div class="cm-editor-body"></div>').append(content.element);

			if(footer)
				body.append(footer.element);

			if(inlineContent)
				body.append(inlineContent);

			self.element.addClass('commonmark-editor')
				.append(header.element)
				.append(body);

			self.text(options.text);
		}

		$.fn.commonMarkEditor = function(options) {
			options = $.extend({ text: '', header: true, save: false, inline: false, title: '', toggle: true }, options);

			return this.map(function(index, item) { return new Editor(item, options); });
		};
	};

	if(typeof define === 'function' && define.amd)
		define([ 'jquery', 'commonmark' ], init);
	else
		init(jQuery, commonmark)
})();
