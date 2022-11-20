FROM node:18 as node

WORKDIR /usr/src/app

COPY . .
RUN npm ci
RUN npm run build

ENV TZ=Asia/Bishkek
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

CMD ["bash", "launch.sh"]




