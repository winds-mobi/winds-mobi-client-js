#!/usr/bin/env bash

su - windmobile -c "cd /home/windmobile/winds-mobi-client-js; git fetch; git pull"
su - windmobile -c "python /home/windmobile/winds-mobi-client-js/deploy/maxcdn_purge_cache.py"
