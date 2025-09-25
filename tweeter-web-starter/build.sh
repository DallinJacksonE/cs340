#!/usr/bin/bash

cd tweeter-shared && npm run build
cd ../tweeter-web && npm run build
sleep 2s
npm start
