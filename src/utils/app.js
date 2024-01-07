const path = require("path");
require("dotenv").config();

module.exports.env = (key, defaultValue = null) => {
    return process.env[key] || defaultValue;
};

module.exports.appPath = (subPath = null) => {
    const rawAppPath = this.env("APP_PATH", "src/");
    let realAppPath = rawAppPath[0] == "/" ? rawAppPath : path.resolve(__dirname, "../../" + rawAppPath);

    if(realAppPath[realAppPath.length - 1] == "/")
        realAppPath = realAppPath.slice(0, realAppPath.length - 1);

    if(!subPath)
        return realAppPath;
    if(subPath[0] != "/")
        subPath = "/" + subPath;
    return path.join(realAppPath, subPath);
};