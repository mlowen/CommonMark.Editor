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