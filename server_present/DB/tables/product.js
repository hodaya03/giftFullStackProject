const connectionDB = require("./connectToDB")

var createProduct=
"CREATE TABLE IF NOT EXISTS `Product` (`Id` INT AUTO_INCREMENT NOT NULL, `Name` NVARCHAR(50) NOT NULL, `Image` BLOB NOT NULL, `Category` INT NOT NULL, `BusinessId` INT NOT NULL, `Price` INT NOT NULL, PRIMARY KEY (`Id`), FOREIGN KEY (`BusinessId`) REFERENCES `Business` (`Id`), FOREIGN KEY (`Category`) REFERENCES `Category` (`Id`));";

connectionDB.query(createProduct, function(err, result){
    if (err) throw err;
    console.log("product table created!");
});