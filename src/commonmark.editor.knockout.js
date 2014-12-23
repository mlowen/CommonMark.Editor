(function() {
	var init = function($, ko) {
		if(ko.bindingHandlers.commonmarkEditor)
			return;

		ko.bindingHandlers.commonMarkEditor = {
			init: function(element, accessor) {
				var editor = $(element).commonMarkEditor()[0];
				var text = '';
				var value = accessor();

				if(typeof value === 'function') {
					text = value();

					editor.on.change(function(e) { value(e.text); });
					value.subscribe(function(update) { editor.text(update); });
				} else {
					text = value;
				}

				editor.text(text);
			}
		}
	};

	if(typeof define === 'function' && define.amd)
		define([ 'jquery', 'knockout', 'commonmark.editor' ], init);
	else
		init(jQuery, ko);
})();
