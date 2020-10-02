#!/bin/sh

service couchdb start

wget -O /dev/null --retry-connrefused --waitretry=2 --read-timeout=20 --timeout=1 --tries=30 http://localhost:5984

chmod +x ./scripts/loadData.sh && ./scripts/loadData.sh

useradd -ms /bin/bash node && \
    chown -R node:node . && \
    su node -c 'npm install' && \
    npm cache clean --force

chmod +x ./scripts/deleteAndLoadSnapsets.sh && ./scripts/deleteAndLoadSnapsets.sh

NODE_ENV=gpii.config.cloudBased.flowManager.preferencesServer.production npm start
