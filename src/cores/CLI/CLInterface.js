const Command = require("./Command");

class CLInterface extends Command {

    constructor() {
        super();
        this.commands = {};
    }
    
    addCommand(name, setCommand = null) {
        let command = new Command();
        if(typeof setCommand == "function")
            command = setCommand(command);
        this.commands[name] = command;
        return this;
    }

    run(args, handler) {
        if(args.length < 1 || args[0].indexOf("--") >= 0) {
            if(this.isMatch(args)) {
                if(Object.keys(this.commands) < 1)
                    return handler(this.optionValues);
                return handler("main", this.optionValues);
            }
            throw new Error("CLInterface cannot found related command");
        }

        const commandName = args[0];
        const commandArgs = args.slice(1);
        if(commandName in this.commands && this.commands[commandName].isMatch(commandArgs))
            return handler(commandName, this.commands[commandName].optionValues);
        throw new Error("CLInterface cannot found related command");
    }

}

module.exports = CLInterface;