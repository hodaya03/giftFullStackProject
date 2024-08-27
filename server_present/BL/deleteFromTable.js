var mysql = require("mysql2");
const { connectToDb } = require("../DB/tables/connectToDB");

function deleteFromTable(tableName, line, condition) {
  const con = connectToDb();

  con.connect(function (err) {
    if (err) throw err;

    var sql = `DELETE FROM ${tableName} WHERE ${line} = '${condition}'`;
    console.log('sql-------------------------------',sql);
    
    con.query(sql, function (err, result) {
      if (err) {
        console.error(`Could not delete from ${tableName} table`, err);
        return;
      }
      console.log(
        "Number of records deleted: " +
          result.affectedRows +
          `from ${tableName}`
      );
    });
  });
}

<<<<<<< HEAD
// deleteFromTable("Students", "name", "Itshak");

deleteFromTable("User", "Id", "12");
module.exports = {deleteFromTable};
=======
// deleteFromTable("Cart", "Id", "6");
>>>>>>> 707a7819cc8e0587248583e31f7d15382aef915c

module.exports = { deleteFromTable };
