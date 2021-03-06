# CommonMark.Editor

CommonMark.Editor is a basic web based editor for [CommonMark](http://commonmark.org/) loosely inspired by the markdown editor available at [GitHub](https://github.com/).

## Dependencies

* [CommonMark](http://commonmark.org/) tested against [0.17](https://github.com/jgm/CommonMark/releases)
* [Bootstrap](http://getbootstrap.com/) tested against [3.3.2](https://github.com/twbs/bootstrap/releases/tag/v3.3.2) - only dependent on the stylesheet.
* [jQuery](http://jquery.com/) tested against [2.1.3](https://github.com/jquery/jquery/releases/tag/2.1.3)

CommonMark.Editor should work against other versions of these libraries but has only been tested against the ones noted above.

### Optional

* [RequireJS](http://requirejs.org/)

## Building

CommonMark.Editor uses [Grunt](http://gruntjs.com/) to minimise the javascript and compile the [LESS](http://lesscss.org/) file. Once you have Grunt installed you only need to run `grunt` from the CommonMark.Editor directory to build, this will create a directory called `dist` which will contain the files.

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

* **header** *(default: true)* - When set to false the border around the top of the tabs and the tabs background is set to be transparent.
* **inline** *(default: false)* - When set to true it will display the html content of the editor in a non-editable state, the tabs will be hidden, the header will contain a button which when clicked will enable the editing of the content.
* **name** *(default: null)* - When set to a non-null value this will set the name of the text area in the editor so it can be used as part of a form.
* **save** *(default: false)* - When set to true the editor will now display a save and revert changes button below the text area and preview. The editor will only update the value returned by the `text()` method and trigger a change event when the save button is clicked. Revert will take remove any pending changes and reset what is currently being edited to the value of the `text()` method.
* **text** *(default: empty string)* - This will set the initial text in the editor.
* **title** *(default: empty string)* - This will set the text in the header of the editor when `inline` is enabled and the tabs are not visible.
* **toggle** *(default: true)* - This flag denotes if a toggle is displayed in the upper right corner when `inline` is enabled, if this flag is specified when `inline` is false it will be ignored.

### Editor API

The plugin method returns an array of editor objects one for each element returned by the selector, this object allows you to programmatically interact with the editor.

#### Methods

* **element** - The jQuery object which the plugin was called on.
* **inline()** - Will return a boolean, `true` if the editor is in "inline" mode and `false` if in "edit" mode. If `inline` was not enabled via the options when creating the editor it will always return `false`.
* **inline(*boolean*)** - Will set if the editor is in "inline" or "edit" mode, this method will only work when the `inline` flag is set to true when creating the editor, otherwise it does nothing.
* **text()** - Will return you the current text of the editor.
* **text(*string*)** - Sets the current text of the editor.

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

###### inlineToggle

This is only fired when the `inline` option is set to true and the user has toggled between "inline" and "edit" modes.

```js
var editor = $('#editor').commonMarkEditor();
editor[0].on.inlineToggle(function() {
	console.log('Inline has been toggled.');
});
```

### Require.JS

CommonMark.Editor will expose itself as an [AMD module](http://en.wikipedia.org/wiki/Asynchronous_module_definition) if it is possible, in such cases it will **not** load itself into the global scope so it does necessarily not play well in environments where there is a mixture of AMD modules and libraries loaded into the global scope.

The easiest way to way to setup CommonMark.Editor to work in as an AMD module is to add it to your require config in a similar way to the following:

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

### Knockout Bindings

Bindings for [Knockout](http://knockoutjs.com/) are also provided for the editor via the `commonMarkEditor` binding. The simplest form of binding looks like.

```html
<html>
	<head>
		<link rel="stylesheet" href="http://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.1/css/bootstrap.min.css" />
		<link rel="stylesheet" href="<path to styles>/commonmark.editor-0.1.0.min.css" />

		<script src="http://spec.commonmark.org/js/commonmark.js"></script>
		<script src="http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
		<script src="http://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.1/js/bootstrap.min.js"></script>
		<script src="http://cdnjs.cloudflare.com/ajax/libs/knockout/3.2.0/knockout-min.js"></script>
		<script src="<path to scripts>/commonmark.editor-0.1.0.min.js"></script>
		<script src="<path to scripts>/commonmark.editor.knockout-0.1.0.min.js"></script>

		<title>CommonMark editor demo</title>
	</head>
	<body>
		<div class="container">
			<div class="page-header">
				<h1>CommonMark Editor Knockout Bindings</h1>
			</div>

			<div data-bind="commonMarkEditor: observable"></div>
		</div>

		<script>
			$(function() {
				ko.applyBindings({ observable: ko.observable('Sample content') });
			});
		</script>
	</body>
</html>
```

If you want to pass any options to the editor that is being created you can do so by passing an object to the binding.

```html
<div data-bind="commonMarkEditor: { value: observable, inline: true, title: 'Inline title' }">
```

All of the options with the exception of `text` are respected. The `inline` option can be assigned to an observable like the `value` option, doing so will allow to control if the editor is in 'inline' mode as if the `inline(boolean)` method had been called.

Like the main library the knockout bindings will expose as an AMD module if possible.

### Issues

If you find any issues while using CommonMark.Editor please feel free to report them at the [GitHub Repository](https://github.com/mlowen/CommonMark.Editor/issues).

### Contributing

If you want to contribute feel free to fork the [GitHub repository](https://github.com/mlowen/CommonMark.Editor) and submit a pull request.

## License

CommonMark.Editor is available under the MIT license which is as follows:

Copyright &copy; 2014, 2015 Michael Lowen

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
