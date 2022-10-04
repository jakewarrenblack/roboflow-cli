const Conf = require("conf");

const config = new Conf({
    projectSuffix: "",
    cwd: process.env.HOME + "/.config/roboflow",
    projectName: "roboflow"
});

// env vars take precedence over config values
function getCascadingConfigValue(key, defaultValue) {
    if (key.startsWith("RF_") && process.env[key]) {
        return process.env[key];
    } else if (config.has(key)) {
        return config.get(key);
    } else {
        return defaultValue;
    }
}

module.exports = {
    get: function (key) {
        return getCascadingConfigValue(key);
    },

    set(key, value) {
        return config.set(key, value);
    },

    getAll() {
        return {
            ...config.store,
            RF_WORKSPACE: getCascadingConfigValue("RF_WORKSPACE"),
            RF_APP_URL: getCascadingConfigValue("RF_APP_URL", "https://app.roboflow.com"),
            RF_API_URL: getCascadingConfigValue("RF_API_URL", "https://api.roboflow.com")
        };
    },

    clear() {
        return config.clear();
    },

    configFile: config.path
};