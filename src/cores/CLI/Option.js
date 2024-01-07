class Option {

    constructor(key, type) {
        if(!key instanceof String)
            throw new Error("Option.constructor's first argument should be string");
        this.key = key;
        this.type = type;
        this.isRequired = false;
        this.defaultValue = null;
    }

    required(val) {
        if(!val instanceof Boolean)
            throw new Error("Option.isRequired argument should be Boolean");
        this.isRequired = val;
        return this;
    }

    setDefault(val) {
        this.defaultValue = val;
        return this;
    }

    getInterfaceText() {
        return `--${ this.key }`;
    }

    getValue(cmd) {
        const regExp = `${ this.getInterfaceText() }=(.+)`;
        const match = cmd.match(new RegExp(regExp));

        if(match) {
            if(this.type == Boolean)
                return match[1] == true;
            return this.type(match[1]);
        }

        return null;
    }

}

module.exports = Option;