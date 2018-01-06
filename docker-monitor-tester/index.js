const express = require('express');
const winston = require('winston');
const app = express();

const logger = winston.createLogger({
    level: 'info',
    transports: [
        new winston.transports.Console()
    ]
});


app.get('/', (req, res) => {
    const startTime = new Date().getTime();
    logger.info(`received request`);
    let arr = [];
    for (let i = 0; i < 100000; i++) {
        arr.push(i);
    }
    let array = arr.map(i => ({number: i}));
    let endTime = new Date().getTime();
    let totalTime = endTime - startTime;
    logger.info(`request time: ${totalTime}`);
    res.send(array);
});

app.listen(8080, () => {
        logger.info(`i'm listening... on 3000`)
    }
);