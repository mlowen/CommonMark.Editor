module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %>-<%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd") %> */\n*/',
			},
			build: {
				src: '<%= pkg.name %>.js',
				dest: 'dist/<%= pkg.name %>-<%= pkg.version %>.min.js'
			}
		}
	});

	/* Plugins */
	grunt.loadNpmTasks('grunt-contrib-uglify');

	/* Tasks */
	grunt.registerTask('default', ['uglify']);
};
