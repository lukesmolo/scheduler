FROM node:14.15.3-alpine

WORKDIR /app
COPY package.json .
RUN npm install -g @nestjs/cli
RUN npm install
COPY . .
RUN npm run build
RUN cd $WORKDIR

EXPOSE 3000

ENV NODE_ENV=production
CMD [ "npm", "run", "start:prod" ]
