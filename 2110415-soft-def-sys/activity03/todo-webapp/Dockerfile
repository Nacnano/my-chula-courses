FROM node:16-alpine

COPY . /root/todo-webapp
WORKDIR /root/todo-webapp
RUN yarn install

EXPOSE 3000
ENV TODO_ENDPOINT http://todo:8000/
CMD  yarn start
