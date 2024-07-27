var mysql = require('mysql2');
const { connectToDb } = require('../DB/tables/connectToDB');
  
  
const sqlStatements = [

  "INSERT INTO Category ( Name) VALUES ('Jewlery')",
  'INSERT INTO category ( Name) VALUES ("Toys")',
  'INSERT INTO category ( Name) VALUES ("Decorations")',
  'INSERT INTO category ( Name) VALUES ("Clothing")'
 
    
    
     ];
    
    sqlStatements.forEach((sql) => {
      connection.query(sql, (err, result) => {
        if (err) throw err;
        console.log("inserted!");
      });
    });
    

  