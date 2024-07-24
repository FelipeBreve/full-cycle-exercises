package gateway

import "github.com.br/felipebreve/fc-felipe-wallet/internal/entity"


type TransactionGateway interface {
	Create(transaction *entity.Transaction) error
}
