const fs = require("fs");

class MigrationTemplate {
    
    constructor({ filePath, typeExtractor }) {
        this.path = filePath;
        this.migrationName = null;

        if(typeof typeExtractor == "function")
            this.typeExtractor = typeExtractor;
        else
            this.typeExtractor = (migrationName) => "default";
    }

    extractType(migrationName) {
        const extractor = this.typeExtractor;
        return extractor(migrationName);
    }

    isMatch(migrationName) {
        const type = this.extractType(migrationName);
        if(!type)
            return false;
        this.migrationName = migrationName;
        return true;
    }

    getContent() {
        const type = this.extractType(this.migrationName);
        if(!type) return null;

        const content = fs.readFileSync(this.path).toString();
        return content;
    }

}

class MigrationWithTableTemplate extends MigrationTemplate {

    constructor(params) {
        super(params);
    }

    getContent() {
        const type = this.extractType(this.migrationName);
        const tableName = this.migrationName.slice(type.length + 1);
        if(!type) return null;

        let content = fs.readFileSync(this.path).toString();

        const regExp = /{{\s*([^\s{}]+)\s*}}/g;
        const matches = [];
        let match;
        while((match = regExp.exec(content)) !== null) {
            matches.push({ key: match[1], mark: match[0] });
        }

        const params = { tableName };
        matches.forEach(({ key, mark }) => {
            const value = (key in params) ? params[key] : "";
            content = content.replaceAll(mark, value);
        });

        return content;
    }

}

module.exports = { MigrationTemplate, MigrationWithTableTemplate };