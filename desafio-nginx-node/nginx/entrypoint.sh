# #!/bin/bash
# set -e

# # Supondo que sua aplicação Node.js esteja rodando no host 'app-host' na porta 3000.
# # Espera até que a aplicação Node.js esteja pronta para aceitar conexões.
# /wait-for app:3000 -t 30

# # Depois que a aplicação Node.js estiver pronta, inicie o NGINX.
# exec "$@"