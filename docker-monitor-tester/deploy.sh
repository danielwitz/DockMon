#!/usr/bin/env bash

docker build web/. -t nicom93/dockmon-tester
#docker build simulator/. -t nicom93/dockmon-tester-simulator
docker push nicom93/dockmon-tester
#docker push nicom93/dockmon-tester-simulator