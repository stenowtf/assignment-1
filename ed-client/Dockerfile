FROM node:boron

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install yarn
RUN mkdir -p /opt
ADD yarn.latest.tar.gz /opt/
RUN mv /opt/dist /opt/yarn
ENV PATH "$PATH:/opt/yarn/bin"

#install app dependencies
COPY ./package.json /usr/src/app/
COPY ./yarn.lock /usr/src/app/
RUN yarn install

# Bundle app source
COPY ./ /usr/src/app


EXPOSE 3000

CMD [ "yarn", "start" ]
