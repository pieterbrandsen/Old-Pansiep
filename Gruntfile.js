let localSync = [];
try {
    localSync = require("./.localSync"); // eslint-disable-line global-require
} catch (e) {
    // empty
}

module.exports = function(grunt) {
    grunt.loadNpmTasks("grunt-jsdoc");

    grunt.initConfig({
    });

    grunt.log.writeln(new Date().toString());
};
