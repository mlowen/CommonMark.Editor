# CommonMark.Editor

CommonMark.Editor is a basic web based editor for [CommonMark](http://commonmark.org/) loosely inspired by the markdown editor available at [GitHub](https://github.com/).

## Dependencies

* [CommonMark](http://commonmark.org/)
* [Bootstrap](http://getbootstrap.com/) - only on the stylesheet.
* [jQuery](http://jquery.com/)

### Optional

* [RequireJS](http://requirejs.org/)

## Building

CommonMark.Editor uses [Grunt](http://gruntjs.com/) to minimise the javascript and compile the [LESS](http://lesscss.org/) file. Once you have Grunt installed you only need to run `grunt` from the CommonMark.Editor directory to build, this will create a directory called `dist` in that folder which will contain the files.

## Usage

CommonMark.Editor is a jQuery plugin, the most basic use case for it is as follows

```html
<html>
	<head>
		<link rel="stylesheet" href="http://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.1/css/bootstrap.min.css" />
		<link rel="stylesheet" href="dist/commonmark.editor-0.1.0.min.css" />

		<script src="http://spec.commonmark.org/js/commonmark.js"></script>
		<script src="http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
		<script src="http://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.1/js/bootstrap.min.js"></script>
		<script src="dist/commonmark.editor-0.1.0.min.js"></script>

		<title>CommonMark editor demo</title>
	</head>
	<body>
		<div class="container">
			<div class="page-header">
				<h1>CommonMark Editor</h1>
			</div>

			<h2>Default editor</h2>
			<div id="editor"></div>
		</div>

		<script>
			$(function() {
				var editor = $('#editor').commonMarkEditor();
			});
		</script>
	</body>
</html>
```

### Options

When creating an editor the method can take an object as a parameter to customise the editor, the available options are:

* **text** *(default: empty string)* - This will set the initial text in the editor.
* **header** *(default: true)* - When set to false the border around the top of the tabs and the tabs background is set to be transparent.
* **save** *(default: false)* - When set to true the editor will now display a save and revert changes button below the text area and preview. The editor will only update the value returned by the `text()` method and trigger a change event when the save button is clicked. Revert will take remove any pending changes and reset what is currently being edited to the value of the `text()` method.
* **inline** *(default: false)* - When set to true it will display the html content of the editor in a non-editable state, the tabs will be hidden, the header will contain a button which when clicked will enable the editing of the content.
* **title** *(default: empty string)* - This will set the text in the header of the editor when `inline` is enabled and the tabs are not visible.

### Editor API

The plugin method returns an array of editor objects one for each element returned by the selector, this object allows you to programmatically interact with the editor.

#### Methods

* **text()** - Will return you the current text of the editor.
* **text(*string*)** - Sets the current text of the editor.
* **element** - The jQuery object which the plugin was called on.

#### Events

All subscriptions to events occur through the `on` property of the editor.

###### change

This is fired whenever the text in the editor is changed.

```js
var editor = $('#editor').commonMarkEditor();
editor[0].on.change(function(e) {
	console.log('new text: ' + e.text);
});
```

### Require.JS

CommonMark.Editor will expose itself as an [AMD module](http://en.wikipedia.org/wiki/Asynchronous_module_definition) if it is possible, in such cases it will **not** load itself into the global scope so it does necessarily not play well in environments where there is a mixture of AMD modules and libraries loaded into the global scope.

The easiest way to way to setup CommonMark.Editor to work in as an AMd module is to add it to your require config in a similar way to the following:

```js
requirejs.config({
	'paths': {
		'commonmark': 'http://spec.commonmark.org/js/commonmark',
		'jquery': 'http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min',
		'commonmark.editor': '<path to scripts>/commonmark.editor-<version>.min',
	}
});
```

Where it is important that jQuery and CommonMark are also available as AMD modules. If you also want load the CSS for CommonMark.Editor with require the recommended way of doing so is to shim in the dependency with the a [require css plugin](https://github.com/guybedford/require-css) as follows:

```js
requirejs.config({
	'paths': {
		'commonmark': 'http://spec.commonmark.org/js/commonmark',
		'css': 'http://cdnjs.cloudflare.com/ajax/libs/require-css/0.1.5/css',
		'jquery': 'http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min',
		'commonmark.editor': '<path to scripts>/commonmark.editor-<version>.min',
	},
	'shim': {
		'commonmark.editor': { deps: [ 'css!<path to styles>/commonmark.editor-<version>.min' ] }
	},
});
```

### Issues

If you find any issues while using CommonMark.Editor please feel free to report them at the [GitHub Repository](https://github.com/mlowen/CommonMark.Editor/issues).

### Contributing

If you want to contribute feel free to fork the [GitHub repository](https://github.com/mlowen/CommonMark.Editor) and submit a pull request.

## License

CommonMark.Editor is available under the MIT license which is as follows:

Copyright &copy; 2014 Michael Lowen

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
