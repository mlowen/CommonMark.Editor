var Renderer = function(className) {
	var self = this;
	
	var reader = commonmark.Parser();
	var writer = commonmark.HtmlRenderer();

	self.element = $('<div class="' + className + '"></div>');

	self.hide = function() { self.element.hide(); };
	self.show = function() { self.element.show(); };
	self.toggle = function() { self.element.toggle(); };
	self.visible = function() { self.element.is(':visible'); };
	
	self.commonmark = function(text) {
		self.element.html(writer.render(reader.parse(text)));
	};
	
	self.html = function() { self.element.html(); };
};