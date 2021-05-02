import 'dotenv/config';
import Server from 'server';

const startServer = () => {
    const app = new Server().app;
    const port: number = parseInt(<string>process.env.PORT) || 5000;

    app.listen(port, '0.0.0.0', () => {
        console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
    });
};

startServer();
