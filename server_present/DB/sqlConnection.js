// SQLConnection.js

const { use } = require("express/lib/application");
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Ofakim123?",
  port: 3306,
  database: "presentDB",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL");
    return;
  }
  console.log("Connected!");
});

const sqlStatements = [

// "CREATE TABLE IF NOT EXISTS `Business` (`Id` INT AUTO_INCREMENT NOT NULL, `Name` NVARCHAR(20) NOT NULL, `Password` NVARCHAR(50) NOT NULL, `Phone` CHAR(10) NOT NULL, `Email` NVARCHAR(50) NOT NULL, `City` NVARCHAR(50) NOT NULL, `Country` NVARCHAR(50) NOT NULL, PRIMARY KEY (`Id`));",
// "CREATE TABLE IF NOT EXISTS `Category` (`Id` INT AUTO_INCREMENT NOT NULL, `Name` NVARCHAR(50) NOT NULL, PRIMARY KEY (`Id`));",
//"CREATE TABLE IF NOT EXISTS `Product` (`Id` INT AUTO_INCREMENT NOT NULL, `Name` NVARCHAR(50) NOT NULL, `Image` VARCHAR(255) NOT NULL, `Category` INT NOT NULL, `BusinessId` INT NOT NULL, `Price` DECIMAL(10, 2) NOT NULL, `Description` NVARCHAR(50) NOT NULL,PRIMARY KEY (`Id`), FOREIGN KEY (`BusinessId`) REFERENCES `Business` (`Id`), FOREIGN KEY (`Category`) REFERENCES `Category` (`Id`));",
//"CREATE TABLE IF NOT EXISTS `Cart` (`Id` INT AUTO_INCREMENT NOT NULL, `ProductId` INT NOT NULL, `ProductName` NVARCHAR(50) NOT NULL,`Amount` INT NOT NULL, `Price` NVARCHAR(50) NOT NULL, `PresentId` INT NOT NULL, PRIMARY KEY (`Id`), FOREIGN KEY (`ProductId`) REFERENCES `Product` (`Id`), FOREIGN KEY (`PresentId`) REFERENCES `Present` (`Id`));",
// "CREATE TABLE IF NOT EXISTS `User` (`Id` INT AUTO_INCREMENT NOT NULL,   `Mail` VARCHAR(50) NOT NULL, `Password` NVARCHAR(50) NOT NULL, PRIMARY KEY (`Id`));",
// "CREATE TABLE IF NOT EXISTS `Present` ( `Id` INT AUTO_INCREMENT NOT NULL,`Date` DATETIME NOT NULL,`ExpirationDate` DATETIME NOT NULL, `Amount` NVARCHAR(50) NOT NULL, `Category` INT NOT NULL, `UserId` INT NOT NULL, `GiftCode` INT NOT NULL, `Buyed` NVARCHAR(50) NOT NULL, `DelEmail` NVARCHAR(50) NOT NULL, `DelPhoneNumber` NVARCHAR(50) NOT NULL, `DelName` NVARCHAR(50) NOT NULL, `DelNote` NVARCHAR(50) NOT NULL, PRIMARY KEY (`Id`), FOREIGN KEY (`UserId`) REFERENCES `User` (`Id`), FOREIGN KEY (`Category`) REFERENCES `Category` (`Id`));",

 


 ];

sqlStatements.forEach((sql) => {
  connection.query(sql, (err, result) => {
    if (err) throw err;
    console.log("Table created");
  });
});
