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
        'meta/*.*',
        'cache.manifest'
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
    }
  });

  var plugins = require('matchdep').filterDev('grunt-*');
  plugins.forEach(grunt.loadNpmTasks);

  grunt.registerTask('default', ['jshint', 'nice-package', 'sass', 'replace']);
};
