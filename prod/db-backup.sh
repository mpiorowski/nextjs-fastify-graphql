DATE=$(date +"%Y-%m-%d_%H_%M_%S")
docker exec -t bills-db-prod pg_dumpall -c -U admin | gzip > ./backup/dump_bills_$DATE.gz
rclone copy backup/dump_bills_$DATE.gz pcloud:backup