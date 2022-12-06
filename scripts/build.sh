#!/bin/sh

set -x 


BUILD_DIR=$(pwd)/build
INFO_DIR=${BUILD_DIR}/info
cp /etc/os-release ${INFO_DIR}/os-release


rm package.json
rm package-lock.json


npm init
result=$?
if [ ! ${result} -eq 0 ]; then
    echo "Error: $0[${LINENO}]"
    echo "result: ${result}"
    exit 1
fi


npm install
result=$?
if [ ! ${result} -eq 0 ]; then
    echo "Error: $0[${LINENO}]"
    echo "result: ${result}"
    exit 1
fi

npm run build
result=$?
if [ ! ${result} -eq 0 ]; then
    echo "Error: $0[${LINENO}]"
    echo "result: ${result}"
    exit 1
fi
