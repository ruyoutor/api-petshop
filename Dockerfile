FROM mysql/mysql-server

ARG ROOT_PASSWORD=admin
ENV MYSQL_ROOT_PASSWORD=${ROOT_PASSWORD}

ARG SETUP_DATABASE=petshop
ENV MYSQL_DATABASE=${SETUP_DATABASE}

ARG SETUP_REMOTE_USERNAME=admin
ARG SETUP_REMOVE_PASSWORD=admin


RUN echo "CREATE USER '${SETUP_REMOTE_USERNAME}'@'%' IDENTIFIED BY '${SETUP_REMOVE_PASSWORD}';GRANT ALL PRIVILEGES ON *.* TO '${SETUP_REMOTE_USERNAME}'@'%' WITH GRANT OPTION;" > /docker-entrypoint-initdb.d/_grant_remote.sql

EXPOSE 3306

CMD ["mysqld"]