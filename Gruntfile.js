let localSync = [];
try {
    localSync = require("./.localSync"); // eslint-disable-line global-require
} catch (e) {
    // empty
}

module.exports = function(grunt) {
    grunt.loadNpmTasks("grunt-typedoc");
    grunt.initConfig({
        typedoc: {
            build: {
                options: {
                    module: "esnext",
                    target: "es2017",
                    out: "docs/",
                },
                src: "src/**/*"
            }
        }
    });

    grunt.log.writeln(new Date().toString());
    grunt.registerTask("run-typedoc", ["typedoc"]);
};
