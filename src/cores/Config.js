class Config {
    constructor(data) {
        this.set(data);
    }

    get(searchKey = null) {
        if(searchKey === null) {
            return this.data;
        }

        const keys = searchKey.split(".");
        let value = this.data;
    
        for(const key of keys) {
            if(value && typeof value === "object" && key in value) {
                value = value[key];
            } else {
                value = null;
                break;
            }
        }
    
        return value;
    }

    set(data) {
        const processConfigData = (inputData) => {
            if(inputData instanceof Config) {
                return inputData.get();
            } else if(Array.isArray(inputData)) {
                return inputData.map(processConfigData);
            } else if(inputData && typeof inputData === "object") {
                const newObj = {};
                for(const [key, value] of Object.entries(inputData)) {
                    newObj[key] = processConfigData(value);
                }
                return newObj;
            }
            return inputData;
        };
      
        this.data = processConfigData(data);
    }
}

module.exports = Config;

/*
const appMode = new Config("development");

const database = new Config({
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "test"
});

const privateKeys = new Config([ "test123", "dev123", "key123" ]);

const config = new Config({ appMode, database, privateKeys });

- case: const result = config.get("appMode"),
    result = "development"
- case: const result = config.get("testUndefinedKey"),
    result = null
- case: const result = config.get("database"),
    result = { host: "localhost", port: 3306, username: "root", password: "", database: "test" }
- case: const result = config.get("database.host"),
    result = "localhost"
- case: const result = config.get("database.host.data"),
    result = null
- case: const result = config.get("privateKeys"),
    result = [ "test123", "dev123", "key123" ]
- case: const result = config.get("privateKeys.0"),
    result = "test123"
- case: const result = config.get("privateKeys.2"),
    result = "key123"
- case: const result = config.get("privateKeys.3"),
    result = null
- case: const result = config.get(),
    result = {
        appMode: "development",
        database: { host: "localhost", port: 3306, username: "root", password: "", database: "test" },
        privateKeys: [ "test123", "dev123", "key123" ]
    }
*/