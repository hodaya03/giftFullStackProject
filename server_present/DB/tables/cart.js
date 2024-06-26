const connectionDB = require("./connectToDB")

var createCart=
"CREATE TABLE IF NOT EXISTS `Cart` (`Id` INT AUTO_INCREMENT NOT NULL, `ProductId` INT NOT NULL, `ProductName` NVARCHAR(50) NOT NULL,`Amount` INT NOT NULL, `Price` INT NOT NULL, PRIMARY KEY (`Id`)), FOREIGN KEY (`ProductId`) REFERENCES `Product` (`Id`));";

connectionDB.query(createCart, function(err, result){
    if (err) throw err;
    console.log("category table created!");
});