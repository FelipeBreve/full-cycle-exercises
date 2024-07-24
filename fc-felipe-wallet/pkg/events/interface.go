package events

import (
	"sync"
	"time"
)

// Evento
type EventInterface interface {
	GetName() string
	GetDateTime() time.Time
	GetPayload() interface{}
	SetPayload(payload interface{})
}

// Executor
type EventHandlerInterface interface {
	Handle(event EventInterface, wg *sync.WaitGroup)
}

// "Disparador"
type EventDispatcherInterface interface {
	Register(eventName string, handler EventHandlerInterface) error
	Dispatch(event EventInterface) error
	Remove(eventName string, handler EventHandlerInterface) error
	Has(eventName string, handler EventHandlerInterface) bool
	Clear()
}
