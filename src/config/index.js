const Config = require("../cores/Config");
const app = require("./app");
const database = require("./database");

module.exports = new Config({ app, database });