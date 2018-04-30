import {sequelize} from './db';
import {logger} from './logger';
import {User} from './models/user';
import * as express from 'express';

const port = process.env.port || 8080;

export async function runServer() {
    try {
        const app = express();
        await sequelize.authenticate();
        logger.info('connected to db!');

        await sequelize.sync({
            force: true
        });
        logger.info('db has been rebuilt!');
        logger.info('create user');
        await User.create({
            username: 'janedoe',
            birthday: new Date(1980, 6, 20)
        });
        logger.info('user created');
        app.get('/', (req, res) => {
            logger.info('Received request');
            res.send({status: 'ok'});
        });
        app.listen(port, () => {
            logger.info(`Web server is running on port ${port}`);
        });
    }
    catch (err) {
        logger.error(err);
    }
}