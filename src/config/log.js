const Config = require("../cores/Config");
const { env, realAppPath } = require("../utils/app");

const logsDir = env("APP_LOGS_DIR", "logs/");
const baseLogsDir = logsDir[0] == "/" ? logsDir : realAppPath(logsDir);

module.exports = new Config({
    baseDir: baseLogsDir,
    botPrefix: "bot",
    alertPrefix: "alert"
});