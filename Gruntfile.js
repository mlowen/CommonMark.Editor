module.exports = function(grunt) {
	var banner = '/*! <%= pkg.name %>-<%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd") %> */\n';

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			development: {
				options: {
					banner: banner,
					sourceMap: true
				},
				files: {
					'dist/<%= pkg.name %>-<%= pkg.version %>.min.js': 'src/<%= pkg.name %>.js',
					'dist/<%= pkg.name %>.knockout-<%= pkg.version %>.min.js': 'src/<%= pkg.name %>.knockout.js'
				}
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
					'dist/<%= pkg.name %>-<%= pkg.version %>.min.css': "src/<%= pkg.name %>.less"
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
