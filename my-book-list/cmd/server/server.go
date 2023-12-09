package main

import (
	"log"
	"github.com/GabrielMessiasdaRosa/my-book-list/graph"
	"net/http"
	"os"
	"database/sql"
	"github.com/GabrielMessiasdaRosa/my-book-list/internal/database"
	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	_ "github.com/lib/pq"
)

const defaultPort = "8080"

func main() {
	db, err := sql.Open("postgres", "host="+os.Getenv("DB_HOST")+" port="+os.Getenv("DB_PORT")+" user="+os.Getenv("DB_USER")+" password="+os.Getenv("DB_PASSWORD")+" dbname="+os.Getenv("DB_NAME")+" sslmode="+os.Getenv("DB_SSLMODE"))
	if err != nil {
		log.Fatal(err)
	}
	log.Println("Database connected!")
	err = database.createCategoryTable(db)
	if err != nil {
    log.Fatal(err)
	}
	if err != nil {
    log.Fatal(err)
	}
	defer db.Close()

	categorydb := database.NewCategory(db)

	port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
	}

	srv := handler.NewDefaultServer(graph.NewExecutableSchema(graph.Config{Resolvers: &graph.Resolver{
		Categorydb: categorydb,
	}}))

	http.Handle("/", playground.Handler("GraphQL playground", "/query"))
	http.Handle("/query", srv)

	log.Printf("Playground > http://localhost:%s/ ", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
