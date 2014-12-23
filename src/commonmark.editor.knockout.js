(function() {
	var init = function($, ko) {
		
	};

	if(typeof define === 'function' && define.amd)
		define([ 'jquery', 'knockout', 'commonmark.editor' ], init);
	else
		init(jQuery, ko);
})();
