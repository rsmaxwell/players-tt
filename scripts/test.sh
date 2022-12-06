#!/bin/sh

set -x

echo "testing: players-tt"

BUILD_DIR=./build
cd ${BUILD_DIR}

pwd
ls -al 

./players-tt --version
