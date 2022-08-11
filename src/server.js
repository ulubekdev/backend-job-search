import express from 'express';
import cors from 'cors';
import './config/index.js';

import UserRouter from './routes/users.js';
import JobRouter from './routes/jobs.js';

import database from './config/db.js';
import mockData from './mock.js'

const PORT = process.env.PORT || 5000;

!async function () {
    const app = express();

    app.use(cors());
    app.use(express.json());
    app.use(express.static(process.cwd() + 'uploads'));

    const db = await database();
    await mockData({ sequelize: db });

    app.use((req, res, next) => {
        req.models = db.models;
        next();
    });

    app.use(UserRouter);
    app.use(JobRouter);
    
    app.listen(PORT, () => console.log(`server ready at http://localhost:${PORT}`));
}();