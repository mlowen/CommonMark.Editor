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