# downloads dashboard

Welcome! :)

## How to manually install

Prerequisites: Node, Yarn, Go.

1. `cd ~/<projects_folder>`
1. `git clone https://github.com/stenowtf/dd.git`
1. `cd dd/dd-client`
1. `yarn install` or `npm install`
1. `yarn start` or `npm start`
1. `cd $GOPATH/src/github.com/stenowtf`
1. `ln -s ~/<projects_folder>/dd/dd-server dd-server`
1. `go get gopkg.in/gorethink/gorethink.v3 github.com/gorilla/websocket github.com/mitchellh/mapstructure`
1. `cd dd-server && go run *.go`
1. `brew update && brew install rethinkdb && rethinkdb`
1. Navigate to: [`http://localhost:8080/#dataexplorer`](http://localhost:8080/#dataexplorer) and run this two commands:
    - `r.dbCreate('dd');`
    - `r.db('dd').tableCreate('downloads');`
1. Finally open [`http://localhost:3000`](http://localhost:3000) and enjoy!

## How to install using Docker

1. `cd ~/<projects_folder>`
1. `git clone https://github.com/stenowtf/dd.git`
1. `cd dd`
1. `git checkout docker`
1. `docker-compose up`
1. Open [`http://localhost:3000`](http://localhost:3000) and enjoy!

## Description

Once you opened [`http://localhost:3000`](http://localhost:3000) you can see a map area and a section with the graphs:

![](./example.png?raw=true)

On the map, you can click on it to simulate a download, but you can also use the linkon the upper right to generate more random data.

There are graphs that represent the total downloads by country, by time of the day, by operating system, and by version of the app.

Of course, you can open two different tabs and see real-time changes.

### FAQs

Q. I get `ReferenceError: google is not defined`. What's going on?

A. Networking error, try to refresh the page.

