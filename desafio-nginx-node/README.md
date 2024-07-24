# Desafio em Nginx

Nesse projeto a ideia é termos um proxy reverso `nginx` a frente da aplicacao, sendo ele o cara que faz a chamada da aplicacao em `nodejs` e de fato a aplicacao que faz a comunicacao com o banco de dados `mysql`

> Lembrando que essas aplicacoes nao estao desenvolvidas nas melhores praticas possiveis, apenas dando enfase na subida das aplicacoes usando docker-compose.

## Desafios encontrados

- Criar o arquivo do nginx para realizar o proxy reverso.
- Aguardar o banco de dados ficar disponivel para que a aplicacao execute.
- Entender os conceitos de build em **varios estagios** alem de outros conceitos embutidos de docker.

## Estrutura da aplicacao

- Pasta
  - mysql (banco de dados, caso a pasta nao exista tem que **criar**)
  - nginx (proxy reverso)
  - node-app (aplicacao)
- docker-compose.yml

### Executando a aplicacao

Primeiro de tudo, executar o comando (Caso já possua as imagens):

```
    docker-compose up
```

Talvez seja necessario `buildar` as imagens:

```
    docker-compose up --build
```

Depois caso de tudo ok, pode verificar se os ambientes estao em pe.

```
    docker-compose ps
```

Ou (Semanticamente o **docker container** faz mas sentido)

```
    docker container ls / docker ps
```

## Usando a aplicacao

Para fazer o uso da aplicacao é simples.

Primeiro voce pode entrar na rota de verificacao

```
    http://localhost:8080/full-cycle
```

Para criar algum `usuario`, voce pode acessar o seguinte link:

```
    http://localhost:8080/create/:name

    Exemplo:
    http://localhost:8080/create/felipe
```

Depois retorne para a pagina de "home" para verificar a busca das informacoes.

```
    http://localhost:8080/full-cycle
```

## Observacoes

- Lembrando que a aplicacao em NodeJS nao tem nenhum codigo feito da melhor forma, ou seja, somente para fins de estudo.
- As imagens nao utilizam algumas imagens 'pequenas' devido a algumas limitacoes das dependencias, no caso da aplicacao em node, ela usa a latest, porem deveria ser utilizado uma imagem 'pre fixada', para evitar bugs, alem de uma imagem mais 'leve' (isso serve para nginx e mysql tambem)
- a utilizacao do wait-for é necessario devido a quando inicia a aplicacao, é de fato onde 'cria-se' a tabela do banco de dados, sendo assim, nunca a mesma nao estaria criada.
- Nginx config é um dos desafios, pois de acordo com os estudos, voce consegue usar da melhor forma a comunicacao interna entre os containers.
