FROM node AS build

WORKDIR /project

COPY . .
RUN npm install

EXPOSE 80

ENTRYPOINT exec npm run dev