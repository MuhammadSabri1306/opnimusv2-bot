const path = require("path");

module.exports = (testPath) => {
    if(testPath[0] == "/")
        testPath = testPath.slice(1);
    testPath = path.resolve(__dirname, `../../tests/${ testPath }.js`);
    require(testPath);
};