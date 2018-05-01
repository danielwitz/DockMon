#!/usr/bin/env bash

echo ${SERVER}
ssh -i dockmon.pem ec2-user@${SERVER} "mkdir docker-monitor-tester"
scp -i dockmon.pem ../docker-monitor-tester/docker-compose.yml ec2-user@${SERVER}:~/docker-monitor-tester/docker-compose.yml
ssh -i dockmon.pem ec2-user@${SERVER} "cd docker-monitor-tester && docker-compose up -d"
#ssh -i dockmon.pem ec2-user@${SERVER} "mkdir docker-monitor"
#scp -i dockmon.pem docker-compose.yml ec2-user@${SERVER}:~/docker-monitor/docker-compose.yml
#ssh -i dockmon.pem ec2-user@${SERVER} "cd docker-monitor && docker-compose up -d"