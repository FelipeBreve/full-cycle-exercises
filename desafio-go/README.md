# Desafio em GO

O objetivo desse projeto seria criar uma aplicacao usando a linguagem GO, com apenas 2MBs.

Problema encontrados

1. Encontrar imagens pequenas.
1. Problema de tamanho para Compilar o Hello world em GO.

## Solucoes para os problemas.

### Encontrar imagens pequenas.

Ao procurar imagens pequenas, foi encontrado a do `busybox` [link](https://hub.docker.com/_/busybox/tags?page=1&name=1.29-uclibc), sendo uma das menores que de fato executaria a imagem.

#### Problema com o tamanho da imagem.

A imagem possuia a estrutura basica do hello world do GO, como do exemplo

```
package main

import "fmt"

func main() {
    fmt.Println("hello world")
}
```

Mas a biblioteca `fmt`, possui alguns recursos que **Aumentam** o tamanho da aplicacao, porem para fins desse exercicio segui essa estrategia, segue o [link](https://stackoverflow.com/questions/3861634/how-to-reduce-go-compiled-file-size) utilizado para tal fim.

#### Estrategia de build

Outra estrategia utilizada foi o **build**, otimizado, removendo algumas coisas como `symbol table` e `disable DWARF generation`, porem lembrando que foi somente para fins desse exemplo, pois dependendo da situacao nao sendo a melhor solucao.

#### Multi-stage

Já a estrategia de multi-stage foi utilizada para de fato gerar apenas o **artefato** e fazer a copia para a imagem necessaria.

# Executando a imagem.

Depois de toda a explicacao, voce pode executar tanto a imagem pelo DockerRegistry ou local.

**Fluxo 1** Caso seja pelo docker-registry.

- `docker pull felipebreve/challenge-go`

**Fluxo 2** Ou de forma local.

Voce `builda` a imagem.

- `docker build . -t felipebreve/challenge-go`

Depois pode verificar se a mesma ja foi criada.

- `docker images | grep felipebreve/challenge-go`

Depois é só executar a aplicacao

- `docker run --rm felipebreve/challenge-go`

E pronto, aplicacao rodando!!!
