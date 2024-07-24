# Desafio em Event Driven Architecture

## Instrucoes para executar o projeto.
```
docker compose up
```

Aguardar a subida de todos os ambientes.

## Execucao
Apenas acessar a pasta **api/client.http**, nao é necessario criar contas, pois ja existem criadas e populadas, apenas executar esses trechos:

```
###

POST http://localhost:8090/transactions HTTP/1.1
Content-Type: application/json

{
    "account_id_from": "account1",
    "account_id_to": "account2",
    "amount": 100
}

###
GET http://localhost:3003/balance/balances/account1 HTTP/1.1
Content-Type: application/json

###
GET http://localhost:3003/balance/balances/account2 HTTP/1.1
Content-Type: application/json
```

sera o suficiente para testar o fluxo do envio da aplicacao em go para o kafka, alem de outra aplicacao consumir os dados.