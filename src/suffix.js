	};

	var amdAvailable = typeof define === 'function' && define.amd; 

	if(amdAvailable)
		define([ 'jquery', 'commonmark' ], init);
	
	if(jQuery && commonmark)
		init(jQuery, commonmark)
	else if(!amdAvailable)
		console.log('Unavble to load dependency for Bootstrap Commonmark Editor.');
})();