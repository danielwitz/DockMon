#!/usr/bin/env bash

echo ${SERVER}
scp -i dockmon.pem ../docker-monitor-tester/docker-compose.yml ec2-user@${SERVER}:~
ssh -i dockmon.pem ec2-user@${SERVER} "docker-compose up -d"