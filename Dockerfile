# Common build stage
FROM node:20.5.1 as common-build-stage

COPY . /app

WORKDIR /app

RUN npm cache clean --force

RUN npm i

RUN npx prisma

RUN npx prisma generate

RUN npm run build

RUN git clone https://github.com/vishnubob/wait-for-it.git

EXPOSE 5000