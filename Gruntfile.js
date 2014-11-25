module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.initConfig({

        // Build .less files
        less: {
            dev: {
                files: [{
                    expand: true,
                    cwd: 'public/styles/less/',
                    src: ['*.less'],
                    dest: 'public/styles/css/',
                    ext: '.css'
                }]
            }
        },

        compass: {
            dist: {
                options: {
                    sassDir: 'public/styles/sass',
                    cssDir:  'public/styles/css',
                    environment: 'production'
                }
            },
            dev: {
                options: {
                    sassDir: 'public/styles/sass',
                    cssDir:  'public/styles/css'//,
                    // sourcemap: 'true',
                }
            }
        },

        jshint: {
            files: [
                'Gruntfile.js',
                'model/**/*.js',
                'public/frontend/**/*.js',
                'public/backend/**/*.js',
                'routes/**/*.js',
                'utils/**/*.js',
                '*.js'
            ],
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            }
        }
    });

    grunt.registerTask('build', ['jshint', 'compass:dev']);

};
