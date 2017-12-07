//Gruntfile
module.exports = function(grunt){

    var compileOptions = {
        mainConfigFile: "app/src/main.js",
        baseUrl: "app/src",
        include: ['main'],
        out: "dist/main.min.js",
        removeCombined: false,
        findNestedDependencies: true,

        onBuildWrite: function(moduleName, path, contents){
            if(/(.*)js\/modules\/(.*)/.test(path)){
                return contents.replace(/console.log(.*);/g, ';');
            }

            return contents;
        }
    }

    //Initializing the configuration object
    grunt.initConfig({
        less: {
            development: {
                options: {
                    compress: false
                },
                files: {
                    "./app/css/styles.css": "./app/css/base.less"
                }
            },
            production: {
                options: {
                    cleancss: true, //minify css
                    compress: true
                },
                files: {
                    "./dist/main.min.css": "./app/css/base.less"
                }
            }
        },
        requirejs: {
            compile: {
                options: compileOptions
            }
        },
        watch: {
            less: {
                files: ['app/css/*.less'],
                tasks: ['less'],
            },
            requireJs: {
                files: ['app/src/main.js'],
                tasks: ['requirejs'],
            }
        }
    });

    //Plugin loading
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-watch');

    //Task definition
    grunt.registerTask('default', ['watch']);
};