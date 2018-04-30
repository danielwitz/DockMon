#!/usr/bin/env bash

echo ${SERVER}
ssh -i dockmon.pem ec2-user@${SERVER} "mkdir docker-monitor"
scp -i dockmon.pem docker-compose.yml ec2-user@${SERVER}:~/docker-monitor/docker-compose.yml
ssh -i dockmon.pem ec2-user@${SERVER} "cd docker-monitor && docker-compose up -d"