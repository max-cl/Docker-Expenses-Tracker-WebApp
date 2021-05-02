import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import passport from 'passport';
import compression from 'compression';
import 'config/passport.config';
import { errorHandler } from 'middlewares/error.middleware';
import { notFoundHandler } from 'middlewares/notFound.middleware';

// Routes
import router from 'routes/';

// Utils
import { checkDbConnection, syncForce, syncPasive, syncAlter } from 'utils/sequelize.util';

class Server {
    public app: Application;

    constructor() {
        this.app = express();
        this.config();
    }

    private config(): void {
        checkDbConnection();
        // syncPasive();
        // syncAlter();
        // syncForce();
        this.app.use(compression());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cors());
        this.app.use(helmet());
        this.app.use(passport.initialize());
        this.app.use(router);
        this.app.get('/', (req: Request, res: Response, next: NextFunction) => {
            res.status(200).json({ message: 'success' });
        });

        this.app.use(errorHandler);
        this.app.use(notFoundHandler);
    }
}
export default Server;
