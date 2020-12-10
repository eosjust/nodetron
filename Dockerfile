# Using a compact OS
FROM node:8.14.1-jessie

RUN mkdir -p /home/www/app
WORKDIR /home/www/app

COPY . /home/www/app

RUN npm install

EXPOSE 3000

ENTRYPOINT ["npm", "run"]
CMD ["start"]