#!/usr/bin/env bash

if [[ $(id -u) -eq 0 ]] ; then echo "Please run as user 'winds'" ; exit 1 ; fi

cd /home/winds/winds-mobi-client-js; git fetch; git pull
python3 /home/winds/winds-mobi-client-js/deploy/maxcdn_purge_cache.py
