
// const { use } = require("express/lib/application");
const mysql = require("mysql2");

const connectToDb = () => {
  connectionDB = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Ofakim123?",
  database: "presentDB",
});
// const connectionDB = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "Ofakim123?",
//   database: "presentDB",
// });


connectionDB.connect(function (err) {
    if (err) throw err;
  console.log("Connected to mydb successfully!");
});
return connectionDB;
}


// const connectionDB = () => 
//   {
//     mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "Ofakim123?",
//   database: "presentDB",
// });

// connectionDB.connect(function (err) {
//   if (err) throw err;
//   console.log("Connected to presentDB successfully!");
// });
//   }

module.exports= {connectToDb };