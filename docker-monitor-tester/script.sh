docker build -t nicomend/node-web-app .
docker rm -f node-web-app
docker run -p 9000:8080 -d --name node-web-app nicomend/node-web-app