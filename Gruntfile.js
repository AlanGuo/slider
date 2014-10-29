'use strict';

module.exports = function(grunt) {
  //var version = '1.0.1';
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
        src: ['lib/animate-1.1.js','src/platform-pc.js'],
        dest: 'dist/slider-pc-animate.js'
      },
      touch: {
        src: ['lib/animate-1.1.js','src/platform-touch.js'],
        dest: 'dist/slider-touch-animate.js'
      },
      slider:{
        src: ['src/platform-all.js'],
        dest: 'dist/slider.js'
      },
      allInOne:{
        src: ['lib/animate-1.1.js','src/platform-all.js'],
        dest: 'dist/slider-animate.js'
      },
      amdTouch: {
        src: ['src/amd-touch.js'],
        dest: 'dist/slider-touch-amd.js'
      },
      amdPC: {
        src: ['src/amd-pc.js'],
        dest: 'dist/slider-pc-amd.js'
      },
      amdAll:{
        src: ['src/amd-all.js'],
        dest: 'dist/slider-amd.js'
      },
      fordoc:{
        src: ['lib/animate-1.1.js','src/platform-all.js'],
        dest: 'dist/fordoc/slider-animate.js'
      }
    },

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
