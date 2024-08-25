// const { use } = require("express/lib/application");
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Moshe26!",
  port: 3307,
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
  connection.query("CREATE DATABASE presentDB", function (err, result) {
    if (err) throw err;
    console.log("presentDB database created!");
  });
});
