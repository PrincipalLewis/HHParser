FROM debian:testing
RUN apt-get update && apt-get install nodejs nginx

#Добавить строчку в hosts
#127.0.0.1       hr.livetex.ru

#Настройки nginx
ADD /etc/nginx/sites-enabled/hh /etc/nginx/sites-enabled
RUN /etc/init.d/nginx restart


RUN ln -s /usr/bin/nodejs node

COPY * /home/dev/hh
RUN node bin/index.js
