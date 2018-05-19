const express = require('express');
const httpProxy = require('http-proxy');
const _ = require('lodash');
const path = require('path');

if (_.isEmpty(process.env.PROXY)) {
  throw new Error('process.env.PROXY is required!');
}

const proxyUrl = process.env.PROXY;
const apiProxy = httpProxy.createProxyServer();
console.log('Proxy URL:', proxyUrl);

const port = process.env.PORT || 9999;
const frontendFolder = 'frontend';

const app = express();
app.use(express.static(frontendFolder));

app.all('/api/*', (req, res) => {
  const targetUrl = req.url.replace('/api', '');
  console.log('Redirecting to:', `${proxyUrl}${targetUrl}`);
  req.url = targetUrl;
  apiProxy.web(req, res, {target: proxyUrl});
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(frontendFolder, 'index.html'));
});

app.listen(port, () => {
  console.log('listening on port', port);
});

