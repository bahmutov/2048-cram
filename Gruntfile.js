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
        'favicon.ico',
        'index.html',
        'js/*.js',
        'style/*.css',
        'style/fonts/*.*',
        'meta/*.*',
        'cache.manifest',
        'bower_components/jquery/dist/jquery.min.js',
        'bower_components/bootstrap/dist/js/bootstrap.min.js',
        'bower_components/bootbox/bootbox.js',
        'bower_components/alertify/alertify.min.js',
        'bower_components/bootstrap/dist/css/bootstrap.min.css',
        'bower_components/alertify/themes/alertify.core.css',
        'bower_components/alertify/themes/alertify.bootstrap.css'
      ]
    },

    replace: {
      cache: {
        options: {
          variables: {
            timestamp: '<%= grunt.template.today() %>'
          },
          prefix: '@@'
        },
        files: {
          'cache.manifest': 'cache.manifest.source'
        }
      }
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
    }
  });

  var plugins = require('matchdep').filterDev('grunt-*');
  plugins.forEach(grunt.loadNpmTasks);

  grunt.registerTask('default', ['jshint', 'nice-package', 'sync', 'bower', 'sass', 'replace']);
};
