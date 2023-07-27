FROM nikolaik/python-nodejs:python3.9-nodejs16-bullseye

WORKDIR /app
RUN cd $WORKDIR
RUN npm install -g @nestjs/cli
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

EXPOSE 3000

ENV NODE_ENV=production
CMD [ "npm", "run", "start:prod" ]
