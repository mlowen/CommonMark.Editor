	};

	if(typeof define === 'function' && define.amd)
		define([ 'jquery', 'commonmark' ], init);
	else
		init(jQuery, commonmark)
})();