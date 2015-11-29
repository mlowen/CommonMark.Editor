var Content = function(options) {
	var self = this;
	var state = null;
	var events = { change: 'cm-editor-content-change' };

	var textarea = $('<textarea class="form-control"></textarea>');
	var preview = $('<div class="preview"></div>');

	if(options.name)
		textarea.attr('name', options.name);

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