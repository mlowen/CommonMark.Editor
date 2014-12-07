# CommonMark.Editor

CommonMark.Editor is a basic web based editor for [CommonMark](http://commonmark.org/) loosely inspired by the markdown editor available at [GitHub](https://github.com/).

## Dependencies

* [CommonMark](http://commonmark.org/)
* [Bootstrap](http://getbootstrap.com/)
* [jQuery](http://jquery.com/)

### Optional

* [RequreJS](http://requirejs.org/)
* [RequireJS CSS plugin](https://github.com/guybedford/require-css)

## Usage

CommonMark.Editor is a jQuery plugin that exposes itself as a AMD module. A very trimmed down example of how to use it is:

```html
<html>
	<head>
		<link rel="stylesheet" href="http://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.1/css/bootstrap.min.css" />
	</head>
	<body>
		<div class="container">
			<div class="page-header">
				<h1>CommonMark Editor</h1>
			</div>

			<div id="editor"></div>
		</div>

		<script src="http://cdnjs.cloudflare.com/ajax/libs/require.js/2.1.15/require.min.js"></script>
		<script>
			require([ 'jquery', 'commonmark.editor' ], function ($) {
				var editor = $('#editor').commonMarkEditor();
			});
		</script>
	</body>
</html>
```

This example does leave some setup stuff as an exercise to the reader.

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