#!/usr/bin/env bash

echo ${SERVER}
ssh -i dockmon.pem ec2-user@${SERVER} "sudo service docker stop"
ssh -i dockmon.pem ec2-user@${SERVER} "sudo dockerd -H unix:///var/run/docker.sock -H tcp://0.0.0.0:2375"