#!/bin/bash

source .env

export $(grep -v '^#' $MS1_FOLDER/.env | sed -s "s:^:$MS1_PREFIX:g" | xargs) # включаем переменные первого сервиса и добавляем им префикс MS1_
export ${MS1_PREFIX}VERSION=$(cat ${MS1_FOLDER}/package.json | awk '/"version[ :"]*[0-9]*\.[0-9]*\.[0-9]*",/ {print $0}' | sed -s 's:[^0-9\.]*::g')

export $(grep -v '^#' $MS2_FOLDER/.env | sed -s "s:^:$MS2_PREFIX:g" | xargs) # включаем переменные второго сервиса и добавляем им префикс MS2_
export ${MS2_PREFIX}VERSION=$(cat ${MS2_FOLDER}/package.json | awk '/"version[ :"]*[0-9]*\.[0-9]*\.[0-9]*",/ {print $0}' | sed -s 's:[^0-9\.]*::g')


# echo "Удаляем предыдущие образы"
# echo "[x] ${MS1_IMAGE_NAME}:${MS1_VERSION}"
# docker rmi ${MS1_IMAGE_NAME}:${MS1_VERSION}

# echo "[x] ${MS2_IMAGE_NAME}:${MS2_VERSION}"
# docker rmi ${MS2_IMAGE_NAME}:${MS2_VERSION}


docker-compose build
docker-compose up #-d


