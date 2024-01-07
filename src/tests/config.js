const config = require("../config");
const configDbDefault = require("../config/database/default");

console.log(config.get("app.path"));
console.log(config.get("app"));
console.log(config.get("database.default"), configDbDefault.get());
console.log(config.get());