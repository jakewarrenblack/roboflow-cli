const config = require("../../config.js");
const chalk = require("chalk");

const { selectWorkspace } = require("../core.js");

module.exports = async function selectDefaultWorkspace() {
    console.log("select default");
    const newDefaultWorkspace = await selectWorkspace();
    console.log("select default 1", newDefaultWorkspace);
    config.set("RF_WORKSPACE", newDefaultWorkspace);
};