FROM debian:jessie

RUN apt-get update && apt-get upgrade -y
RUN apt-get install -y wget curl ca-certificates vim lsb-release && apt-get clean

# Install rethinkdb
RUN \
echo "deb http://download.rethinkdb.com/apt `lsb_release -cs` main" | tee /etc/apt/sources.list.d/rethinkdb.list && \
wget -qO- http://download.rethinkdb.com/apt/pubkey.gpg | apt-key add - && \
apt-get update && \
apt-get install -y rethinkdb && \
apt-get install python-pip -y && \
pip install rethinkdb

COPY ./data.json /usr/data.json

CMD ["rethinkdb", "import", "-c", "db:28015", "-f", "/usr/data.json", "--table", "dd.downloads", "--format", "json" ]
