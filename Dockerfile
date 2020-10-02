FROM couchdb:2.3.1

RUN apt-get update -q && apt-get install -q -y \
        curl apt-transport-https apt-utils dialog jq wget

# Set up and install node.js
WORKDIR /home/download

ARG NODEREPO="node_12.x"
ARG DISTRO="stretch"
RUN curl -sSO https://deb.nodesource.com/gpgkey/nodesource.gpg.key
RUN apt-key add nodesource.gpg.key
RUN echo "deb https://deb.nodesource.com/${NODEREPO} ${DISTRO} main" > /etc/apt/sources.list.d/nodesource.list
RUN echo "deb-src https://deb.nodesource.com/${NODEREPO} ${DISTRO} main" >> /etc/apt/sources.list.d/nodesource.list
RUN apt-get update -q && apt-get install -y nodejs

# Set up env variables
# ARG COUCHDB_USER
# ARG COUCHDB_PASSWORD

ENV COUCHDB_DBNAME=gpii

ENV COUCHDB_URL=http://$COUCHDB_USER:$COUCHDB_PASSWORD@localhost:5984/gpii
ENV GPII_COUCHDB_URL=$COUCHDB_URL
ENV STATIC_DATA_DIR=/app/testData/dbData/
ENV BUILD_DATA_DIR=/app/testData/dbData/

# Prepare the app dir
WORKDIR /app
COPY . /app
COPY --chown=couchdb:couchdb single_node.ini /opt/couchdb/etc/local.d/

# Initialize couchdb
# RUN chmod +x ./scripts/loadData.sh && ./scripts/loadData.sh

# Add node user and run npm install
#RUN useradd -ms /bin/bash node && \
#    chown -R node:node . && \
#    su node -c 'npm install' && \
#    npm cache clean --force

# Load prefsSafes and gpiiKeys
# RUN chmod +x ./scripts/deleteAndLoadSnapsets.sh && ./scripts/deleteAndLoadSnapsets.sh

# Change to user node and run the cloudBased flowManager
# USER node
# ENV NODE_ENV=gpii.config.cloudBased.flowManager.preferencesServer.production
RUN chmod +x entrypoint.sh
CMD ["./entrypoint.sh"]
