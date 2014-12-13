requirejs.config({
	'paths': {
		'domReady': 'http://cdnjs.cloudflare.com/ajax/libs/require-domReady/2.0.1/domReady',
		'commonmark': 'http://spec.commonmark.org/js/commonmark',
		'css': 'http://cdnjs.cloudflare.com/ajax/libs/require-css/0.1.5/css',
		'jquery': 'http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min',
		'bootstrap': 'http://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.1/js/bootstrap.min',
		'commonmark.editor': 'dist/commonmark.editor-0.1.0.min',
	},
	'shim': {
		'bootstrap': { deps: ['jquery'] },
		'commonmark.editor': { deps: [ 'css!dist/commonmark.editor-0.1.0.min' ] }
	},
	'urlArgs': 'bust=' + (new Date()).getTime()
});

require(
	[ 'jquery', 'commonmark.editor', 'bootstrap', 'domReady!' ],
	function ($, cmEditor) {
		var editor = $('#default-editor').commonMarkEditor();
		var editor = $('#headless-editor').commonMarkEditor({ header: false });
	}
);
