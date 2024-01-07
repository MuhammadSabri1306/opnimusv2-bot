const { argv } = require("node:process");
const CLInterface = require("./src/cores/CLI/CLInterface");
const testController = require("./src/controllers/clis/test");

const testCli = new CLInterface();
testCli.addOption("path", String, option => option.required(true));

try {

    testCli.run(argv.slice(2), options => {
        const { path } = options;
        testController(path);
    });

} catch(err) {

    console.error("Command not found.");

}