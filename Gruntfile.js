let localSync = [];
try {
    localSync = require("./.localSync"); // eslint-disable-line global-require
} catch (e) {
    // empty
}

module.exports = function(grunt) {
    grunt.loadNpmTasks("grunt-typedoc");
    grunt.loadNpmTasks('grunt-exec');
    
    grunt.initConfig({
        typedoc: {
            build: {
                options: {
                    module: "esnext",
                    target: "es2017",
                    out: "docs/"
                },
                src: "src/**/*"
            }
        },
        exec: {
            test_on_private_server: "node utils/integration/helper.js"
        },
    });

    grunt.log.writeln(new Date().toString());
    grunt.registerTask("run-typedoc", ["typedoc"]);
    grunt.registerTask("test", ["exec:test_on_private_server"]);
};
