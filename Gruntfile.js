'use strict';

module.exports = function(grunt) {
  var version = '1.0.1';
  require('load-grunt-tasks')(grunt);
  // Project configuration.
  grunt.initConfig({
    nodeunit: {
      files: ['test/**/*_test.js'],
    },

    jshint: {
      options: {
        jshintrc: 'core.jshintrc'
      },

      core: {
        src:'src/core.js'
      },

      other:{
        options: {
          jshintrc: 'other.jshintrc'
        },
        files:{
          src:['src/slider.js','src/slider.touch.js']
        }
      },

      gruntfile:{
        src:'Gruntfile.js'
      },

      test:{
        src:'test/**/*.js'
      }
    },

    browserSync: {
      dev:{
        bsFiles: {
          src : ['demo/**/*.*','dist/**/*.js']
        },
        options: {
          server: {
            baseDir: "./"
          },
          startPath: "./demo/index.html",
          watchTask: true
        }
      }
    },

    watch: {
      gruntfile: {
        files: 'Gruntfile.js',
        tasks: ['jshint:gruntfile']
      },
      source: {
        files: ['src/**/*.js','lib/**/*.js'],
        tasks: ['jshint','rig','uglify']
      },
      test: {
        files: 'test/**/*.js',
        tasks: ['jshint:test'/*, 'nodeunit'*/]
      },
    },

    rig: {
      options: {
        banner: "'use strict';\n"
      },
      pc: {
        src: ['src/platform-pc.js'],
        dest: 'dist/slider-pc-'+version+'.js'
      },
      pcAnimate: {
        src: ['lib/animate-1.1.js','src/platform-pc.js'],
        dest: 'dist/slider-pc-animate-'+version+'.js'
      },
      touch: {
        src: ['src/platform-touch.js'],
        dest: 'dist/slider-touch-'+version+'.js'
      },
      touchAnimate: {
        src: ['lib/animate-1.1.js','src/platform-touch.js'],
        dest: 'dist/slider-touch-animate-'+version+'.js'
      },
      allInOne:{
        src: ['lib/animate-1.1.js','src/platform-all.js'],
        dest: 'dist/slider-animate-'+version+'.js'
      },
      amdAll:{
        src: ['src/amd-all.js'],
        dest: 'dist/slider-animate-amd-'+version+'.js'
      }
    },
    
    // concat: {
    //   dist: {
    //     options: {
    //       // Replace all 'use strict' statements in the code with a single one at the top
    //       //banner: "'use strict';\n",
    //       //process: function(src, filepath) {
    //         //return '// Source: ' + filepath + '\n' +
    //         //  src.replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1');
    //       //},
    //     },
    //     files: {
    //       'dist/slider-animate-1.0.js': 
    //       ['lib/animate-1.1.js','src/slider.js','src/slider.touch.js'],
    //       'dist/slider-1.0.js':['src/slider.js','src/slider.touch.js']
    //     },
    //   },
    // },

    uglify: {
      target: {
        files: grunt.file.expandMapping(['dist/*.js'], 'dist/', {
            rename: function(destBase, destPath) {
                return destPath.replace(destBase,'dist/min/').replace('.js', '.min.js');
            }
        })
      }
    }

  });

  // Default task.
  grunt.registerTask('default', ['jshint','rig','uglify', 'browserSync', 'watch']);

};
