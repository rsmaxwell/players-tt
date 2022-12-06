#!/bin/sh

set -x 


BUILD_DIR=$(pwd)/build
ng build --prod


INFO_DIR=${BUILD_DIR}/info
cp /etc/os-release ${INFO_DIR}/os-release
