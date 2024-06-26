const connectionDB = require("./connectToDB")

var createBusiness=
"CREATE TABLE IF NOT EXISTS `Business` (`Id` INT NOT NULL, `Name` NVARCHAR(20) NOT NULL, `Password` NVARCHAR(50) NOT NULL, `Phone` CHAR(10) NOT NULL, `Email` NVARCHAR(50) NOT NULL, PRIMARY KEY (`Id`));";

connectionDB.query(createBusiness, function(err, result){
    if (err) throw err;
    console.log("business table created!");
});