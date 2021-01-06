// Utils
import { logger } from "utils/logger.util";

// Models
import { db } from "models";

const checkDbConnection = () => {
    db.sequelize
        .authenticate()
        .then(() => logger.info("connected to db"))
        .catch(() => {
            throw "error";
        });
    return;
};

const syncForce = () => {
    db.sequelize
        .sync({ force: true })
        .then(() => console.log("connected to db"))
        .catch(() => {
            throw "error";
        });
    return;
};

const syncAlter = () => {
    db.sequelize
        .sync({ alter: true })
        .then(() => console.log("connected to db"))
        .catch((error) => {
            throw "error: " + error;
        });
    return;
};

const syncPasive = () => {
    db.sequelize
        .sync()
        .then(() => console.log("connected to db"))
        .catch(() => {
            throw "error";
        });
    return;
};

export { checkDbConnection, syncForce, syncAlter, syncPasive };
