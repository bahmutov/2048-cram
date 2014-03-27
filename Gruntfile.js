'use strict';

module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'js/*.js'
      ],
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      }
    },

    'nice-package': {
      all: {}
    },

    sass: {
      dist: {
        options: {
          style: 'expanded'
        },
        files: {
          'style/main.css': 'style/main.scss'
        }
      }
    },

    'gh-pages': {
      src: [
        'README.md',
        'favicon.ico',
        'index.html',
        'js/*.js',
        'style/*.css',
        'style/fonts/*.*',
        'meta/*.*',
        'bower_components/jquery/dist/jquery.min.js',
        'bower_components/bootstrap/dist/js/bootstrap.min.js',
        'bower_components/bootbox/bootbox.js',
        'bower_components/alertify/alertify.min.js',
        'bower_components/bootstrap/dist/css/bootstrap.min.css',
        'bower_components/alertify/themes/alertify.core.css',
        'bower_components/alertify/themes/alertify.bootstrap.css',
        'bower_components/multiline/multiline.js',
      ]
    },

    sync: {
      all: {
        options: {
          sync: ['author', 'name', 'version', 'private', 'license', 'keywords'],
        }
      }
    },

    bower: {
      install: {
        options: {
          targetDir: 'bower_components',
          copy: false,
          verbose: true,
          bowerOptions: {
            forceLatest: true
          }
        }
      }
    },

    watch: {
      all: {
        files: ['*.js', 'js/*.js', 'style/*.scss'],
        tasks: ['jshint', 'sass']
      }
    }
  });

  var plugins = require('matchdep').filterDev('grunt-*');
  plugins.forEach(grunt.loadNpmTasks);

  grunt.registerTask('default', ['nice-package', 'sync', 'bower', 'build']);
  grunt.registerTask('build', ['jshint', 'sass']);
  grunt.registerTask('run', ['build', 'watch']);
};
