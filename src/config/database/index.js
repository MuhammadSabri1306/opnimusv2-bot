const Config = require("../../cores/Config");
const { env } = require("../../utils/app");
const defaultDb = require("./default");

module.exports = new Config({ default: defaultDb });