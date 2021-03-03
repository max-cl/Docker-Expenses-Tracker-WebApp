const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.resolve(__dirname, "../.env") });

module.exports = {
    development: {
        url: process.env.DB_URL,
        dialect: "mysql",
        dialectOptions: {
            bigNumberStrings: true,
        },
    },
    production: {
        url: process.env.DB_URL,
        dialect: "mysql",
    },
};
