import { Sequelize } from '@sequelize/core';
import { MySqlDialect } from '@sequelize/mysql';

const database = new Sequelize({
    
    logging: (str) => {
    },
    dialect: MySqlDialect,
    database: process.env.APP_DB,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT ?? 3306),
});

export default database;