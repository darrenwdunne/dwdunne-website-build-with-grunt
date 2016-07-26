module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: ['dist'],
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        // Interesting: globbing won't work, because the .js files need to be included in a particular order (particularly jquery)
        // src: ['src/**/*.js'],
        src: ['src/lib/jquery/jquery-1.12.4.min.js',
          'src/lib/bootstrap-3.3.7-dist/js/bootstrap.min.js',
          'src/js/script.js',
          'src/lib/jquery.easing.min.js',
          'src/lib/scrolling-nav.js'
        ],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    copy: {
      main: {
        files: [
          // includes files within path
          {
            expand: true,
            src: ['src/index*.html'],
            dest: 'dist/',
            filter: 'isFile',
            flatten: true
          }, {
            expand: true,
            cwd: 'src/img/',
            src: ['**/*.{png,jpg,svg}'],
            dest: 'dist/img/'
          }, {
            expand: true,
            cwd: 'src/lib/font-awesome/fonts',
            src: ['**/*'],
            dest: 'dist/fonts/'
          }
        ]
      },
    },
    cssmin: {
      build: {
        files: {
          // Interesting: globbing won't work, because the .js files need to be included in a particular order (particularly jquery)
          //'dist/css/global.css': ['src/**/*.css', '!src/**/*.min.css']
          'dist/css/global.css': ['src/lib/bootstrap-3.3.7-dist/css/bootstrap.min.css',
            'src/css/style.css',
            'src/lib/font-awesome/css/font-awesome.min.css',
            'src/lib/bootstrap-social-gh-pages/bootstrap-social.css',
            'src/lib/font-awesome-animation.min.css'
          ]
        }
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'src/js/**/*.js', 'test/**/*.js'],
      options: {
        globals: {
          jQuery: false
        }
      }
    },
    // sass: {
    //   dist: {
    //     options: {
    //       style: 'compressed'
    //     },
    //     files: {
    //       'dist/global.css': 'src/**/*.css'
    //     }
    //   }
    // },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
        beautify: false,
        compress: true,
        sourceMap: true
      },
      dist: {
        files: {
          'dist/js/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  //  grunt.loadNpmTasks('grunt-contrib-sass');

  // this would be run by typing "grunt test" on the command line
  grunt.registerTask('test', ['jshint', 'qunit']);

  // the default task can be run just by typing "grunt" on the command line
  grunt.registerTask('default', ['clean', 'jshint', 'copy', 'concat', 'uglify', 'cssmin']);
};
