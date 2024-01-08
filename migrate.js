const { argv } = require("node:process");
const CLInterface = require("./src/cores/CLI/CLInterface");
const migrationController = require("./src/controllers/clis/migration");

const cli = (new CLInterface())
    .addOption("name", String)
    .addOption("step", String)
    .addCommand("status")
    .addCommand("create", command => {
        return command.addOption("name", String, option => option.required(true));
    })
    .addCommand("revert", command => {
        return command.addOption("name", String).addOption("step", String);
    });

try {
    cli.run(argv.slice(2), (commandName, options) => {

        if(commandName == "main") {

            migrationController.execute(options);

        } else if(commandName == "status") {

            migrationController.status();

        } else if(commandName == "create") {

            const { name } = options;
            migrationController.createMigration(name);

        } else if(commandName == "revert") {

            migrationController.revert(options);

        }

    });
} catch(err) {

    console.error(err);

}