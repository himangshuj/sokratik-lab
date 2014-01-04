'use strict';

module.exports = function (grunt) {
    // Project Configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        staticRoot: (grunt.option('static') || 'public'),
        watch: {
            jade: {
                files: ['app/views/**'],
                options: {
                    livereload: true,
                },
            },
            js: {
                files: ['gruntfile.js', 'server.js', 'app/**/*.js', 'test/**/*.js', 'assets/js/**/*.js'],
                tasks: ['jshint', 'copy'],
                options: {
                    livereload: true,
                },
            },
            tpls: {
                files: ['assets/js/**/*.html'],
                tasks: ['html2js'],
                options: {
                    livereload: true,
                },
            },

            html: {
                files: ['public/views/**'],
                options: {
                    livereload: true,
                },
            },
            css: {
                files: ['assets/less/**', 'atelier/src/less/**'],
                tasks: ['less'],
                options: {
                    livereload: true
                }
            }
        },
        jshint: {
            all: {
                src: ['gruntfile.js', 'server.js', 'app/**/*.js'],
                options: {
                    jshintrc: true
                }
            }
        },
        nodemon: {
            dev: {
                options: {
                    file: 'server.js',
                    args: [],
                    ignoredFiles: ['public/**'],
                    watchedExtensions: ['js'],
                    debug: true,
                    delayTime: 1,
                    env: {
                        PORT: 3000
                    },
                    cwd: __dirname
                }
            }
        },
        concurrent: {
            tasks: ['nodemon', 'watch'],
            options: {
                logConcurrentOutput: true
            }
        },
        mochaTest: {
            options: {
                reporter: 'spec'
            },
            src: ['test/mocha/**/*.js']
        },
        env: {
            test: {
                NODE_ENV: 'test'
            }
        },
        karma: {
            unit: {
                configFile: 'test/karma/karma.conf.js'
            }
        },
        copy: {
            lib: {
                dest: '<%= staticRoot %>/js/lib/',
                src: ['angular/angular.js',
                    'angular-bootstrap/ui-bootstrap-tpls.js' ,
                    'angular-ui-router/release/angular-ui-router.js',
                    'angular-resource/angular-resource.js',
                    'angular-sanitize/angular-sanitize.js',
                    'underscore/underscore.js',
                    'angular-animate/angular-animate.js',
                    'underscore.string/lib/underscore.string.js',
                    '../node_modules/binaryjs/dist/binary.js'],
                filter: 'isFile',
                cwd: 'vendor',
                flatten: true,
                expand: true
            },
            assets: {
                dest: '<%= staticRoot %>/js/assets/',
                src: ['**/*.js', '!**/*.spec.js'],
                filter: 'isFile',
                cwd: 'assets/js',
                flatten: false,

                expand: true
            },

            atelierApp: {
                dest: '<%= staticRoot %>/js/atelier/app',
                src: ['**/*.js', '!**/*.spec.js'],
                filter: 'isFile',
                cwd: 'atelier/src/app',
                flatten: false,
                expand: true
            },
            atelierCommon: {
                dest: '<%= staticRoot %>/js/atelier/common',
                src: ['**/*.js', '!**/*.spec.js'],
                filter: 'isFile',
                cwd: 'atelier/src/common',
                flatten: false,
                expand: true
            }

        },
        html2js: {
            /**
             * These are the templates from `src/app`.
             */
            lab: {
                options: {
                    base: 'assets/js/app'
                },
                src: [ 'assets/js/app/**/*.tpl.html' ],
                dest: 'public/js/templates-lab.js'
            },
            app: {
                options: {
                    base: 'atelier/src/app'
                },
                src: [ 'atelier/src/app/**/*.tpl.html' ],
                dest: 'public/js/templates-app.js'
            },
            common: {
                options: {
                    base: 'atelier/src/common'
                },
                src: [ 'atelier/src/common/**/*.tpl.html' ],
                dest: 'public/js/templates-common.js'
            }


        },
        less: {
            development: {
                options: {
                    paths: ['atelier/src/less'],
                    ieCompat: false,
                    strictImports: true,
                },
                files: {
                    'public/css/atelier.css': 'assets/less/main.less'
                }
            }
        }

    });

    //Load NPM tasks 
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-env');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-contrib-less');


    //Making grunt default to force in order not to break the project.
    grunt.option('force', true);

    //Default task(s).
    grunt.registerTask('default', ['jshint', 'copy' , 'html2js', 'less', 'concurrent']);

    //Test task.
    grunt.registerTask('test', ['env:test', 'mochaTest', 'karma:unit']);
};