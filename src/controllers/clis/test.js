const path = require("path");
const { appPath } = require("../../utils/app");

module.exports = (testPath) => {
    testPath = appPath(`tests/${ testPath }.js`);
    require(testPath);
};