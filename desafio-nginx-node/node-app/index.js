const express = require("express");
const config = require("./db-config");
const app = express();
const port = 3000;

const mysql = require("mysql");

function createConnection() {
  return mysql.createConnection(config.config);
}

app.get("/full-cycle", async (req, res) => {
  const resultado = await getAllPeople();
  res.send("<h1>Full Cycle Rocks!</h1>" + resultado);
});

app.get("/create/:name", (req, res) => {
  const connection = createConnection();
  const sql = `INSERT INTO people(name) VALUES ('${req.params.name}')`;
  connection.query(sql);
  connection.end();
  res.send(`<h1>Usuario "${req.params.name}" criado com sucesso!</h1>`);
});

app.listen(port, () => {
  const connection = createConnection();
  const sql = `CREATE TABLE IF NOT EXISTS nodedb.people (
    ID INT AUTO_INCREMENT PRIMARY KEY, 
      name VARCHAR(255) NULL
  )`;
  connection.query(sql);
  connection.end();
  console.log("Rodando na porta " + port);
});

function getAllPeople() {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM people";
    const connection = createConnection();
    let resultado = "";

    connection.query(query, function (err, result) {
      if (err) {
        connection.end();
        return reject(err);
      }

      result.forEach((person) => {
        resultado += `Id: ${person.ID} Nome: ${person.name} </br>`;
      });
      connection.end();
      console.log(resultado);
      resolve(resultado);
    });
  });
}
