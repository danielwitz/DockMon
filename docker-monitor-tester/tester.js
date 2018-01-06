const rp = require('request-promise');

const interval = process.env.INTERVAL;
console.log(interval);
setInterval(() => {
    rp('http://localhost:9000').then(()=>{
        console.log('ok');
    });
}, interval);