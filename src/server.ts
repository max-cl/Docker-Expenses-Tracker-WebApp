import express, { Application, Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import passport from "passport";
import compression from "compression";
import "config/passport.config";

// Routes
import router from "routes/";

// Utils
import { checkDbConnection, syncForce, syncPasive, syncAlter } from "utils/sequelize.util";

class Server {
    public app: Application;

    constructor() {
        this.app = express();
        this.config();
    }

    private config(): void {
        checkDbConnection();
        // syncForce();
        // syncPasive();
        // syncAlter();
        this.app.use(compression());
        this.app.use(bodyParser.json({ limit: "5mb", type: "application/json" }));
        this.app.use(bodyParser.urlencoded({ limit: "5mb", extended: true }));
        this.app.use(
            cors({
                origin: (origin, cb) => cb(null, true),
                credentials: true,
                preflightContinue: true,
                exposedHeaders: ["Access-Control-Allow-Headers", "Access-Control-Allow-Origin, Origin, X-Requested-With, Content-Type, Accept", "X-Password-Expired"],
                optionsSuccessStatus: 200,
            }),
        );
        this.app.use(helmet());
        this.app.use(passport.initialize());

        this.app.use(router);

        this.app.get("/", (req: Request, res: Response, next: NextFunction) => {
            res.send("API");
        });
    }
}
export default Server;
