(function() {
	var init = function($, ko) {
		if(ko.bindingHandlers.commonmarkEditor)
			return;

		ko.bindingHandlers.commonMarkEditor = {
			init: function(element, accessor) {
				var text = '';
				var value = accessor();
				var options = typeof value === 'object' ? value : null;
				var inlineObservable = null;

				if(options) {
					value = value.value;

					if(typeof options.inline === 'function')
					{
						inlineObservable = options.inline;
						options.inline = true;
					}
				}

				var editor = $(element).commonMarkEditor(options)[0];

				if(typeof value === 'function') {
					text = value();

					editor.on.change(function(e) { value(e.text); });
					value.subscribe(function(update) { editor.text(update); });
				} else {
					text = value;
				}

				if(inlineObservable) {
					editor.inline(inlineObservable());

					inlineObservable.subscribe(function(value) {
						editor.inline(value);
					});
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
