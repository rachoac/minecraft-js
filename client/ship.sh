#!/usr/bin/env bash

THE_FULL_FILE=$1
THE_FILE=$(echo $THE_FULL_FILE | awk -F"/" '{print $3}')
echo "SHIPPING $THE_FILE... $M_USER"
SCRIPT=$(base64 <<< cat $THE_FULL_FILE)
echo $SCRIPT
CURL_CMD="$M_SERVER:3000/script/$M_USER/$THE_FILE?secret=$JS_SECRET"
curl "$CURL_CMD" -H 'Content-type: application/x-www-form-urlencoded' -X POST -d "script=$SCRIPT" -i
