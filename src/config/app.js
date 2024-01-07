const Config = require("../cores/Config");
const { env } = require("../utils/app");

module.exports = new Config({
    mode: env("APP_MODE", "development"),
    path: env("APP_PATH", "src")
});