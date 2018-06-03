import * as rp from 'request-promise';
import * as Chance from 'chance';
import {logger} from './logger';

const chance = Chance();

const interval = process.env.interval;
const webServerPort = process.env.webServerPort;
console.log('interval', interval);
console.log('webServerPort', webServerPort);
setInterval(() => {
    logger.info(chance.paragraph());
    rp(`http://web:${webServerPort}`).then(() => {
        console.log('ok');
    });
}, interval);