(function() {
	var init = function($, ko) {
		if(ko.bindingHandlers.commonmarkEditor)
			return;

		ko.bindingHandlers.commonMarkEditor = {
			init: function(element, accessor) {
				var editor = $(element).commonMarkEditor({ text: accessor() })[0];
			}
		}
	};

	if(typeof define === 'function' && define.amd)
		define([ 'jquery', 'knockout', 'commonmark.editor' ], init);
	else
		init(jQuery, ko);
})();
