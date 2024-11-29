import { Sequelize } from 'sequelize';
import 'dotenv/config';

export let sequelize = new Sequelize(
    process.env.DB_DATABASE,
    process.env.BD_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: process.env.DB_DIALENCT,
        logging: console.log, 
        // dialectOptions: {
        //     ssl: {
        //         requires: false,
        //         rejectUnauthorized: false, // for self-signed certificates
        //     }
        // }
    }
);