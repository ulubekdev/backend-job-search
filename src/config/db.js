import { Sequelize } from "sequelize"
import models from '../models/index.js'
import { InternalServerError } from "../utils/errors.js";

const sequelize = new Sequelize({
    username: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    dialect: 'postgres',
    logging: false
})

export default async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connnected...!');

        await models({ sequelize });
        await sequelize.sync({ alter: false });

        return sequelize;
    } catch (error) {
        console.log('Database error: ' + error.message);
        throw new InternalServerError(500, error.message);
    }
}