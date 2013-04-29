module.exports = function(grunt) {
  'use strict';

  // Project configuration.
  grunt.initConfig({
    jasmine : {
      tests: {
      src : 'js/**/*.js',
      options : {
        specs : 'spec/**/*Spec.js',
        vendor: [
            '/js/jquery.js',
            '/spec/lib/jasmine-jquery.js',
            '/spec/lib/jasmine.async.js',
            '/spec/lib/mock-ajax.js'
        ],
        host: 'http://127.0.0.1:8125/',
        template:'spec/runner.tmpl',
        outfile: 'spec-runner.html',
        keepRunner: true,
        templateOptions:{
          requireConfig: {
             baseUrl: 'js/',
             config: {
                 tpl: {
                     variable: 'data'
                 }
             }
          }
        }
      }
     }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jasmine');

  grunt.registerTask('default', ['jasmine']);
};

