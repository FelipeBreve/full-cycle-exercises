package gateway

import "github.com.br/felipebreve/fc-felipe-wallet/internal/entity"

type ClientGateway interface {
	Get(id string) (*entity.Client, error)
	Save(client *entity.Client) error
}
