#!/bin/sh

# Esperar até que o banco de dados esteja disponível
wait-for db:3306 -t 40

# Executar o comando original (npm start)
exec "$@"