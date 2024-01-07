const Config = require("../cores/Config");
const app = require("./app");
const database = require("./database");
const log = require("./log");

module.exports = new Config({ app, database, log });