const connectionDB = require("./connectToDB")

var createUser=
"CREATE TABLE IF NOT EXISTS `User` (`Id` INT AUTO_INCREMENT NOT NULL,   `Mail` VARCHAR(50) NOT NULL, `Password` NVARCHAR(50) NOT NULL, PRIMARY KEY (`Id`));";

connectionDB.query(createUser, function(err, result){
    if (err) throw err;
    console.log("user table created!");
});