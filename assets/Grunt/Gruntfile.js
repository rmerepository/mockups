module.exports = function(grunt) {
	grunt.initConfig({
		less: {
			development: {
				options: {
					paths: ["../"],
						dumpLineNumbers: "all"
						// compress: true,
						// yuicompress: true,
						// optimization: 2
				},
				files: {					
					'../css/_style_bundle2.css' : '../less/_style_bundle2.less',
					//'../css/ui-theme.css' : '../less/ui-theme.less',
					//'../css/sme-theme.css' : '../less/sme-theme.less'
				}
			}
		},

		uglify: {
	    options: {
	      mangle: false
	    },
	    my_target: {
	      files: {
	        '../../assets/js/u/c.js': [
	        	'../../assets/js/libs/jquery-1.7.2.min.js',
	        	'../../assets/js/libs/jquery-ui-1.8.21.custom.min.js',
	        	'../../assets/js/bootstrap/bootstrap.js',	        	
	        	'../../assets/js/libs/jquery.toastmessage.js',
	        	'../../assets/js/kendo/kendo.web.min.js'
	        	]
	      }
	    }
	  },
		watch: {
			files: ['../less/*.less','../less/vendor/less/*.less'],
			tasks: 'less',		
		}
	});

	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');	
	grunt.loadNpmTasks('grunt-express');	
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.registerTask('default', 'less');

};
