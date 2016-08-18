FROM ubuntu:latest

MAINTAINER Andrés García <andres@loopa.io>

RUN \
  apt-get update && \
  apt-get install -y apt-transport-https && \
  apt-key adv --keyserver keys.gnupg.net --recv-keys 09617FD37CC06B54 && \
  echo "deb https://dist.crystal-lang.org/apt crystal main" > /etc/apt/sources.list.d/crystal.list && \
  apt-get update && \
  apt-get install -y crystal gcc pkg-config libssl-dev git make && \
  apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

WORKDIR /usr/src/app

ADD src src
ADD shard.yml shard.yml

RUN shards install
RUN crystal build --release /usr/src/app/src/app.cr

EXPOSE 80

CMD ["./app", "--port", "80"]
