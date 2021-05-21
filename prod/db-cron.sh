#write out current crontab
crontab -l > mycron
#echo new cron into cron file
echo "0 0 * * * sh bills-management/docker/db-backup.sh" >> mycron
#install new cron file
crontab mycron
rm mycron