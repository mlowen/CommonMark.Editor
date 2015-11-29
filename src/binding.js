$.fn.commonMarkEditor = function(options) {
	options = $.extend({
		header: true,
		inline: false,
		name: null,
		save: false,
		text: '',
		title: '',
		toggle: true
	}, options);

	return this.map(function(index, item) { return new Editor(item, options); });
};