FROM node:latest

WORKDIR /usr/src/app

COPY . /usr/src/app/
COPY entrypoint.sh /entrypoint.sh

RUN apt update && \
    apt install -y wget netcat-traditional && \
    wget -q -O /usr/bin/wait-for https://raw.githubusercontent.com/eficode/wait-for/v2.2.3/wait-for && \
    chmod +x /usr/bin/wait-for

RUN chmod +x entrypoint.sh    

RUN npm install

# CMD [ "npm", "run", "start" ]
EXPOSE 3000