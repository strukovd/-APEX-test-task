COUNTER=30
STEP=1


while [ $COUNTER -gt 0 ]
do
    echo "[${COUNTER} second...] Waiting for postgres to start"
    sleep $STEP
    COUNTER=$[$COUNTER - $STEP]
done

npm run migration:run
npm run seed:run
node dist/src/main
# npm run start:prod