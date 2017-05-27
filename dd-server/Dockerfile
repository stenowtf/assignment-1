FROM golang:latest
RUN mkdir /app
ADD . /app/
WORKDIR /app
RUN go get gopkg.in/gorethink/gorethink.v3
RUN go get github.com/gorilla/websocket
RUN go get github.com/mitchellh/mapstructure
RUN go build -o main .
EXPOSE 4000
CMD ["/app/main"]
