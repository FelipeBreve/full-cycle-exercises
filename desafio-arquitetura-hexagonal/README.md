Comando para executa os testes
go test ./...

Para mostrar os logs (details)
go test ./... -v

Comando para gerar os mocks necessarios (mockgen)
mockgen -destination=application/mocks/application.go -source=application/product.go application

# Criar tabelas:
```create table products(id string, name string, price float, status string)```

# Comandos do cli
go run main.go cli -a=create -n="Product CLI" -p=25.0

go run main.go cli -a=get --id=6b0325e1-8eee-4a93-9e90-ee7ca52542a7

# Subindo o HTTP

go run main.go http
