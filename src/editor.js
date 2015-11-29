var Editor = function(element, options) {
	var self = this;
	var text = '';
	var html = '';

	var events = {
		on: function(type, callback) { self.element.on(type, callback); },
		trigger: function(type, data) { self.element.trigger(new $.Event(type, data)); },
		types: { change: 'cm-editor-changed', inlineToggle: 'cm-editor-inline-toggle' }
	};

	/* Public API */
	self.element = $(element);

	// Methods
	self.val = function(value) {
		if(typeof value !== 'undefined' && text !== value) {
			text = value;
			content.val(text);
			html = content.html();
	
			if(inlineContent)
				inlineContent.commonmark(text);
	
			self.trigger.change({ text: text });
		}
		
		return text;
	};

	self.html = function(value) { return html; };

	self.inline = function(value) {
		if(!options.inline)
			return false;

		var isInline = inlineContent.visible();

		if(typeof value !== 'undefined' && isInline != value) {
			content.toggle();
			inlineContent.toggle();
			header.toggle();
	
			if(options.save)
				footer.toggle();
	
			self.trigger.inlineToggle();
		}
		
		return inlineContent.visible();
	};

	// Events

	self.on = {
		change: function(callback) { events.on(events.types.change, callback); },
		inlineToggle: function(callback) { events.on(events.types.inlineToggle, callback); }
	};

	self.trigger = {
		change: function(data) { events.trigger(events.types.change, data); },
		inlineToggle: function() { events.trigger(events.types.inlineToggle); }
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

		header.on.toggle(function () { self.inline(!self.inline()); });
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