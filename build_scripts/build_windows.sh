# !/bin/bash
# [WINDOWS BUILD]
# Build application for Windows distribution
# Note: Must be run in Wine Staging with mono installed
electron-packager . --platform=win32 --arch=x64 --ignore=node_modules --overwrite
