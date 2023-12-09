package database

import (
	"database/sql"
	"github.com/google/uuid"
)

type Category struct {
	db *sql.DB
	ID string
	Name string
}

func NewCategory(db *sql.DB) *Category {
	return &Category{db: db}
}

func createCategoryTable(db *sql.DB) {
    query := `
        CREATE TABLE IF NOT EXISTS Category (
            id UUID PRIMARY KEY,
            name TEXT NOT NULL
        );
    `
    _, err := db.Exec(query)
    if err != nil {
		panic(err)
	}
	return log.Println("Category table created!")
}

func (c *Category) Create(name string) (Category, error) {
	id := uuid.New().String()
	_, err := c.db.Exec("INSERT INTO Category (id, name) VALUES ($1, $2)", id, name)

	if err != nil {
		return Category{}, err
	}
	return Category{ID: id, Name: name}, nil
}
