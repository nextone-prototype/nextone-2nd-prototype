#!/bin/bash

DB_DOMAIN=localhost \
DB_NAME=nextonetest \
LOG_LEVEL=info \
ADMIN_AUTH_USER=nextone \
ADMIN_AUTH_PASSWORD=nextpass \
API_VERSION=v1 \
TWITTER_CONSUMER_KEY=cDYLyhqRc9Yk0eo3xsZuUb75l \
TWITTER_CONSUMER_SECRET=1BHOwJKQvctpYcT4GtzR1puTXcktcflwLDS6QX7Cmtg1QRnxlH \
SESSION_SECRET=testtest \
AWS_ACCESS_KEY_ID=AKQ \
AWS_SECRET_KEY=iEIe \
DATA_BUCKET_NAME=nextly-data-bucket \
S3_REGION=ap-northeast-1 \
npm start
