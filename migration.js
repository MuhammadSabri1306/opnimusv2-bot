const { argv } = require("node:process");
const CLInterface = require("./src/cores/CLI/CLInterface");
const migrationController = require("./src/controllers/clis/migration");

const cli = (new CLInterface())
    .addCommand("status")
    .addCommand("create", command => {
        return command.addOption("name", String, option => option.required(true));
    })
    .addCommand("migrate", command => {
        return command
            .addOption("name", String)
            .addOption("step", String)
            .addOption("all", Boolean);
    })
    .addCommand("rollback", command => {
        return command
            .addOption("name", String)
            .addOption("step", String)
            .addOption("all", Boolean);
    });

try {
    cli.run(argv.slice(2), (commandName, options) => {

        console.log(commandName, options)

        if(commandName == "main") {

            

        } else if(commandName == "status") {

            migrationController.status();

        } else if(commandName == "create") {

            const { name } = options;
            migrationController.createMigration(name);

        } else if(commandName == "migrate") {

            migrationController.execute(options);

        } else if(commandName == "rollback") {

            migrationController.revert(options);

        }

    });
} catch(err) {

    console.error(err);

}