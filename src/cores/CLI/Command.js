const Option = require("./Option");

class Command {

    constructor() {
        this.options = [];
        this.optionValues = {};
    }

    addOption(key, type, setOption = null) {
        let option = new Option(key, type);
        if(typeof setOption == "function")
            option = setOption(option);
        this.options.push(option);
        return this;
    }

    isMatch(args) {
        const optionValues = {};
        let value;

        for(let i=0; i<args.length; args++) {
            for(let j=0; j<this.options.length; j++) {

                value = this.options[j].getValue(args[i]);
                if(value !== null) {
                    optionValues[ this.options[j].key ] = value;
                } else if(!this.options[j].isRequired) {
                    optionValues[ this.options[j].key ] = value ? value : this.options[j].defaultValue;
                } else {
                    j = this.options.length;
                    i = args.length;
                    return false;
                }

            }
        }

        this.optionValues = optionValues;
        return true;
    }

}

module.exports = Command;