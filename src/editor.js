var Editor = function(element, options) {
	var self = this;
	var text = '';

	var events = { change: 'cm-editor-changed', inlineToggle: 'cm-editor-inline-toggle' };

	/* Utility functions */
	var toggleInline = function() {
		content.toggle();
		inlineContent.toggle();
		header.toggle();

		if(options.save)
			footer.toggle();

		self.trigger.inlineToggle();
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

	self.on = {
		change: function(callback) { self.element.on(events.change, callback); },
		inlineToggle: function(callback) { self.element.on(events.inlineToggle, callback); }
	};

	self.trigger = {
		change: function(data) { self.element.trigger(new $.Event(events.change, data)); },
		inlineToggle: function() { self.element.trigger(new $.Event(events.inlineToggle)); }
	};

	/* Constructor */
	var header = new EditorHeader(options);
	var content = new EditorContent(options);
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