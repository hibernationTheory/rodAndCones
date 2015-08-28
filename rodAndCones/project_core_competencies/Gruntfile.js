/* variable declarations for paths in use */ 

var src_path = 'src/';
var dist_path = 'dist/';

var src_js_path = src_path + 'static/js/';
var dist_js_path = dist_path + 'static/js/';

var src_styles_path = 'src/static/styles';
var src_styles_sass_path = 'src/static/styles/sass';
var src_styles_css_path = 'src/static/styles/css';
var dist_styles_path = 'dist/static/styles';
var dist_styles_sass_path = 'dist/static/styles/sass';
var dist_styles_css_path = 'dist/static/styles/css';

var src_templates_path = src_path + 'templates/layout';
var src_templates_pages_path = src_path + 'templates/pages/';
var src_templates_partials_path = src_path + 'templates/partials/';

module.exports = function(grunt) {
	grunt.initConfig({
		/* define path variables to be used in config files of various plugins */
		'src_path': src_path,
		'dist_path':dist_path,
		'dist_js_path': dist_js_path,
		'src_js_path':src_js_path,
		/* CSS RELATED */
		'src_styles_path':src_styles_path,
		'src_styles_css_path':src_styles_css_path,
		'src_styles_sass_path':src_styles_sass_path,
		'dist_styles_path':dist_styles_path,
		'dist_styles_sass_path':dist_styles_sass_path,
		'dist_styles_css_path':dist_styles_css_path,
		/* HTML RELATED */
		'src_templates_path':src_templates_path,
		'src_templates_pages_path':src_templates_pages_path,
		'src_templates_partials_path':src_templates_partials_path,
		pkg:require('./package.json')
	});

	grunt.loadTasks('grunt');

	// task setup
	grunt.registerTask('build', 'Build site files for testing or deployment.', 
		[
			'assemble', /* Compile the handlebar stuff */
			'copy', /* Copy the results over to target dir */
			'sass', /* Convert your sass into scss */
			'browserify', /* Expand the modules using babel */
			'replace', /* Replace target value in your files with destionation value in dist folder */
			'watch' /* Watch for changes in a specific dir and launch a task if change happens */
		]);
	grunt.registerTask('empty', 'To get rid of the build folder.' ,
		[
			'clean' /* Remove the build folder */
		]);
	//grunt.registerTask('default', ['uglify']);
};

/* references : 

https://github.com/cowboy/wesbos/commit/5a2980a7818957cbaeedcd7552af9ce54e05e3fb 
*/