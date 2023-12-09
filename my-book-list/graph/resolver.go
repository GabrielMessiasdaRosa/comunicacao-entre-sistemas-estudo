package graph

import (
	"github.com/GabrielMessiasdaRosa/my-book-list/internal/database"
)

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.

type Resolver struct{
	Categorydb *database.Category
}
