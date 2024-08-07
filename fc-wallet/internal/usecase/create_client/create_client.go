package create_client

import (
	"time"

	"github.com.br/felipebreve/fc-wallet/internal/entity"
	"github.com.br/felipebreve/fc-wallet/internal/gateway"
)

type CreateClientInputDTO struct {
	Name  string
	Email string
}

type CreateClientOutputDTO struct {
	ID        string
	Name      string
	Email     string
	CreatedAt time.Time
	UpdatedAt time.Time
}

type CreateClientUSeCase struct {
	ClientGateway gateway.ClientGateway
}

func NewCreateClientUSeCase(clientGateway gateway.ClientGateway) *CreateClientUSeCase {
	return &CreateClientUSeCase{
		ClientGateway: clientGateway,
	}
}

func (uc *CreateClientUSeCase) Execute(input CreateClientInputDTO) (*CreateClientOutputDTO, error) {
	client, err := entity.NewClient(input.Name, input.Email)
	if err != nil {
		return nil, err
	}
	err = uc.ClientGateway.Save(client)
	if err != nil {
		return nil, err
	}

	output := &CreateClientOutputDTO{
		ID:        client.ID,
		Name:      client.Name,
		Email:     client.Email,
		CreatedAt: client.CreatedAt,
		UpdatedAt: client.UpdatedAt,
	}
	return output, nil
}