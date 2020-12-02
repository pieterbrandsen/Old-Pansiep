let localSync = [];
try {
  localSync = require("./.localSync"); // eslint-disable-line global-require
} catch (e) {
  // empty
}

module.exports = function (grunt) {
  grunt.loadNpmTasks("grunt-typedoc");
  grunt.loadNpmTasks("grunt-exec");
  grunt.loadNpmTasks("grunt-eslint");

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
    eslint: {
      fix: {
        src: "src/**/*.ts",
        options: {
          fix: true
        }
      }
    }
  });

  grunt.log.writeln(new Date().toString());
  grunt.registerTask("run-typedoc", ["typedoc"]);
  grunt.registerTask("test", ["exec:test_on_private_server"]);
  grunt.registerTask('lint', ['eslint:fix']);
};
