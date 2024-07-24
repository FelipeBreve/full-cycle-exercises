package main

import (
	// "database/sql"
	// db2 "github.com/felipebreve/hexagonal/adapters/db"
	// "github.com/felipebreve/hexagonal/application"
	_ "github.com/mattn/go-sqlite3"
)

func main() {
	
}

// func main() {
// 	db, _ := sql.Open("sqlite3", "sqlite.db")
// 	productDbAdapter := db2.NewProductDb(db)
// 	productService := application.NewProductService(productDbAdapter)
// 	product, _ := productService.Create("Product 1", 30)

// 	productService.Enable(product)
// }