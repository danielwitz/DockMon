#!/usr/bin/env bash

echo ${SERVER}
ssh -i dockmon.pem ec2-user@${SERVER}