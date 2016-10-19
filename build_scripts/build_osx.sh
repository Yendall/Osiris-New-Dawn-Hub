# !/bin/bash
# [OSX BUILD]
# Build application for OSX distribution
electron-packager . --platform=darwin --arch=all --ignore=node_modules --overwrite
