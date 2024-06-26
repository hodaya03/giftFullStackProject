var mysql = require('mysql2');
const { connectToDb } = require('../DB/tables/connectToDB');

function insertToTable(tableName, parameters, columns){
  const con = connectToDb();

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = `INSERT INTO ${tableName} (${parameters}) VALUES (${columns})`;
  con.query(sql, function (err, result) {
    if (err) {
        console.error(`Could not insert into ${tableName} table`, err);
        return;
      }
    console.log(`1 record inserted to ${tableName}`);
  });
});
}


module.exports = {insertToTable};