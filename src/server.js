import express from 'express';
import cors from 'cors';
import './config/index.js';

import UserRouter from './routes/users.js';
// import JobRouter from './routes/jobs.js';

import database from './config/db.js';
// import mockData from './mock.js'

import logger from './middlewares/logger.js';
import errorHandler from './middlewares/error-handler.js';
import databaseMiddleware from './middlewares/database.js';

const PORT = process.env.PORT || 5000;

!async function () {
    const app = express();

    app.use(cors());

    const db = await database();

    app.use(databaseMiddleware({ sequelize: db }));
    app.use(express.json());

    // await mockData({ sequelize: db });

    app.use((req, res, next) => {
        req.models = db.models;
        next();
    });

    app.use(UserRouter);
    // app.use(JobRouter);
    
    // error handling
    app.use(errorHandler);
    app.use(logger);

    app.listen(PORT, () => console.log(`server ready at http://localhost:${PORT}`));
}();