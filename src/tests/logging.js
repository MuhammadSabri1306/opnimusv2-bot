const logger = require("../utils/loggers/alert");

try {

    logger.info("Test info");
    logger.warn("Test warn");
    throw new Error("Test error");

} catch(err) {

    logger.error(err);
    logger.error("Test logging error with title", err);

}