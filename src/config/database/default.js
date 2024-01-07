const Config = require("../../cores/Config");
const { env } = require("../../utils/app");

module.exports = new Config({
    host: env("MYSQL_DEFAULT_HOST", "localhost"),
    username: env("MYSQL_DEFAULT_USERNAME", "root"),
    password: env("MYSQL_DEFAULT_PASSWORD", ""),
    database: env("MYSQL_DEFAULT_DATABASE", "test")
});