#!/bin/bash

cron_path=/etc/cron.d/crontab

#cron job to run every 1 hour.
echo "$(date -d "$TIME 3min" +"%M") * * * * root /usr/local/bin/python /main.py >> /var/log/cron.log 2>&1" >> $cron_path