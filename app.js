import config from '@dotenvx/dotenvx'
import express from 'express';
import logger from './librairies/logger.js';
import database from './librairies/db.js';
import seedData from './librairies/seed.js';
import passport from 'passport';
import setupSwagger from './librairies/swagger.js';
import routers from './apps/routers/index.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import { exit } from 'process';

config.config();

const PORT = process.env.APP_PORT ?? 3000;
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
setupSwagger(app);

/**
 * Database Configuration
 */
try {
    await database.authenticate();
    await seedData();
    logger.info('Development data initialized');

} catch (error) {
    logger.error(error);
    process.exit();
}

/**
 * Setup Cors
 */
const allowlist = [process.env.FRONT_END_URL]
const corsOptionsDelegate = (req, callback) => {
    let corsOptions;
    if (allowlist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
    } else {
        corsOptions = { origin: false } // disable CORS for this request
    }
    callback(null, corsOptions) // callback expects two parameters: error and options
}
app.use(cors(corsOptionsDelegate));
app.use(cors())

/**
 * Setup middleware logging
 */
app.use(morgan('combined'))

/**
 * Express Configuration
 */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use('/api/uploads', express.static(path.join(__dirname, '/uploads')));

/**
 * Serving static files
 */
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Routes Configuration
 */
routers(app);

/**
 * Catch all requests that don't match any route
 */
app.get("*", (req, res) => {
    res.sendFile(
        path.join(__dirname, 'public/index.html')
    );
});


app.use(notFoundHandler);
app.use(logErrors);
app.use(clientErrorHandler)
app.use(errorHandler);

function notFoundHandler(req, res) {
    res.status(404);
    res.json({ message: '404 - Not Found' });
}

function logErrors(err, req, res, next) {
    logger.error(err);
    next(err)
}

function clientErrorHandler(err, req, res, next) {
    if (req.xhr) {
        res.status(500).send({ message: 'Une erreur inconnue est survenue!' })
    } else {
        next(err)
    }
}

function errorHandler(err, req, res, next) {
    res.status(500);
    res.json({ message: err.message })
}


try {
    await database.authenticate();
} catch (error) {
    logger.error(error);
    exit();
}

let tempServer = app;
if(process.env.NODE_ENV !== "testing") {
    tempServer = app.listen(PORT, () => {
        logger.info(`Intranet is listening on port ${PORT}. You are on ${process.env.NODE_ENV} environment.`)
        logger.info(`Using ${process.env.APP_DB} database.`)
    });
}

const server = tempServer;
export default server;