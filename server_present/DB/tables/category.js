const connectionDB = require("./connectToDB")

var createCategory=
"CREATE TABLE IF NOT EXISTS `Category` (`Id` INT AUTO_INCREMENT NOT NULL, `Name` NVARCHAR(50) NOT NULL, PRIMARY KEY (`Id`));";

connectionDB.query(createCategory, function(err, result){
    if (err) throw err;
    console.log("category table created!");
});