module.exports = function(grunt) {
	var banner = '/*! <%= pkg.name %>-<%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd") %> */\n';

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			options: {
				banner: banner,
			},
			build: {
				src: 'src/<%= pkg.name %>.js',
				dest: 'dist/<%= pkg.name %>-<%= pkg.version %>.min.js'
			}
		},
		less: {
			development: {
				options: {
					banner: banner,
					compress: true,
					yuicompress: true,
					optimization: 2
				},
				files: {
					'dist/<%= pkg.name %>-<%= pkg.version %>.min.css': "src/<%= pkg.name %>.less" // destination file and source file
				}
			}
		}
	});

	/* Plugins */
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-less');

	/* Tasks */
	grunt.registerTask('default', [ 'uglify', 'less' ]);
};
