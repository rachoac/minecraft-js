#!/usr/bin/env bash

THE_FILE=$1
echo "SHIPPING $THE_FILE... $M_USER"
SCRIPT=$(base64 <<< cat $THE_FILE)
echo $SCRIPT
curl "http://ec2-35-161-221-235.us-west-2.compute.amazonaws.com:3000/script/$M_USER/$THE_FILE?secret=$JS_SECRET" -H 'Content-type: application/x-www-form-urlencoded' -X POST -d "script=$SCRIPT"
