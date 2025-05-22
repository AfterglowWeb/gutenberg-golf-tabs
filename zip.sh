#!/bin/bash
rm complex-tabs.zip
zip -r complex-tabs.zip . -x "*.zip" -x "*.tar" -x "*.tar.gz" -x "*.env" -x "*.env*" -x ".git/*" -x ".gitignore" -x "*.config.js" -x "node_modules/*" -x ".DS_Store" -x "._*"