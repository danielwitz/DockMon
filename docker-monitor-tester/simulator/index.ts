const rp = require('request-promise');

const interval = process.env.interval;
const webServerPort = process.env.webServerPort;
console.log('interval', interval);
console.log('webServerPort', webServerPort);
setInterval(() => {
    rp(`http://web:${webServerPort}`).then(() => {
        console.log('ok');
    });
}, interval);