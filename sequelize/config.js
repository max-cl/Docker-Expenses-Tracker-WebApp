import { config } from "dotenv";
import { resolve } from "path";

config({ path: resolve(__dirname, "../.env") });

export const development = {
  dialect: "mysql",
  seederStorage: "sequelize",
  url: process.env.DB_URL
};

export const production = {
  dialect: "mysql",
  url: process.env.DB_URL
};