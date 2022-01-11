#!/usr/bin/env bash

su - winds -c "cd /home/winds/winds-mobi-client-js; git fetch; git pull"
su - winds -c "python3 /home/winds/winds-mobi-client-js/deploy/maxcdn_purge_cache.py"
