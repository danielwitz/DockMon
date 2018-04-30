import {runServer} from './run-server';
import {logger} from './logger';

runServer().then(() => {
    logger.info('running!');
});