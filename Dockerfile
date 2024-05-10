FROM node:16
WORKDIR /apps/structize-assignment-be
COPY package.json yarn.lock ./
RUN npm install --silent
COPY . .
RUN npm run build

EXPOSE 3030
CMD [ "yarn" , "start:dev" ]