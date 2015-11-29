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
	self.val = function(value) {
		if(typeof value !== 'undefined' && text !== value) {
			text = value;
			content.val(text);
	
			if(inlineContent)
				inlineContent.commonmark(text);
	
			self.trigger.change({ text: text });
		}
		
		return text;
	};

	self.inline = function(value) {
		if(!options.inline)
			return false;

		var isInline = inlineContent.visible();

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
	var header = new Header(options);
	var content = new Content(options);
	var footer = options.save ? new Footer() : null;
	var inlineContent = options.inline ? new Renderer('inline-content') : null;

	// Subscribe to events

	header.on.edit(function() { content.state(content.states.edit); });
	header.on.preview(function() { content.state(content.states.preview); });

	content.on.change(function(data) {
		if(options.save) {
			if(data.text === text) footer.disable();
			else footer.enable();
		} else {
			self.val(data.text);
		}
	});

	if(options.save) {
		footer.on.save(function() { self.val(content.val()); });
		footer.on.revert(function() { content.val(self.val()); });
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
		body.append(inlineContent.element);

	self.element.addClass('commonmark-editor')
		.append(header.element)
		.append(body);

	self.val(options.text);
}