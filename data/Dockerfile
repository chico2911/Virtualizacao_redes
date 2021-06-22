FROM debian:10-slim

ENV tmp_dir /tmp

RUN apt-get update \
  && apt-get install -y curl \
  && curl -sL https://deb.nodesource.com/setup_12.x | bash - \
  && apt-get install -y nodejs

RUN npm install -g json-server

COPY db.json .

EXPOSE 3000

CMD ["json-server", "--port", "3000","--host" ,"0.0.0.0","--watch","db.json"]
