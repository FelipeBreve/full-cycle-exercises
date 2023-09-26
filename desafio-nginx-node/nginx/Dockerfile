FROM nginx:latest

# COPY entrypoint.sh /entrypoint.sh

# RUN apt update && \
#     apt install -y wget netcat-traditional && \
#     wget -q -O /usr/bin/wait-for https://raw.githubusercontent.com/eficode/wait-for/v2.2.3/wait-for && \
#     chmod +x /usr/bin/wait-for

ENTRYPOINT ["/docker-entrypoint.sh"]

CMD ["nginx", "-g", "daemon off;"]
