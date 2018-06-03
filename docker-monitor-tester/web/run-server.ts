import {logger} from './logger';
import * as express from 'express';
import * as Chance from 'chance';

const chance = new Chance();
const levels = ['info', 'error', 'debug'];
const port = process.env.port || 8080;
const hardAmount = +process.env.hardAmount;

export async function runServer() {
    try {
        const app = express();
        app.get('/', (req, res) => {
            let level = levels[chance.integer({max: 2, min: 0})];
            console.log(level);
            const hardRequest = chance.bool({likelihood: 20});
            if (hardRequest) {
                logger.info('Hard request!!!!');
                const arr = [];
                for (let i = 1; i <= hardAmount; i++) {
                    let person = {
                        address: chance.address(),
                        name: chance.name(),
                        compay: chance.company(),
                    };
                    arr.push(person);
                }
            }
            logger[level]('Received request');
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