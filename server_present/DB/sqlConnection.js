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

// "CREATE TABLE IF NOT EXISTS `Business` (`Id` INT NOT NULL, `Name` NVARCHAR(20) NOT NULL, `Password` NVARCHAR(50) NOT NULL, `Phone` CHAR(10) NOT NULL, `Email` NVARCHAR(50) NOT NULL, `City` NVARCHAR(50) NOT NULL, `Country` NVARCHAR(50) NOT NULL, PRIMARY KEY (`Id`));",
// "CREATE TABLE IF NOT EXISTS `Category` (`Id` INT AUTO_INCREMENT NOT NULL, `Name` NVARCHAR(50) NOT NULL, PRIMARY KEY (`Id`));",
// "CREATE TABLE IF NOT EXISTS `Product` (`Id` INT AUTO_INCREMENT NOT NULL, `Name` NVARCHAR(50) NOT NULL, `Image` BLOB NOT NULL, `Category` INT NOT NULL, `BusinessId` INT NOT NULL, `Price` INT NOT NULL, PRIMARY KEY (`Id`), FOREIGN KEY (`BusinessId`) REFERENCES `Business` (`Id`), FOREIGN KEY (`Category`) REFERENCES `Category` (`Id`));",
// "CREATE TABLE IF NOT EXISTS `Cart` (`Id` INT AUTO_INCREMENT NOT NULL, `ProductId` INT NOT NULL, `ProductName` NVARCHAR(50) NOT NULL,`Amount` INT NOT NULL, `Price` INT NOT NULL, PRIMARY KEY (`Id`), FOREIGN KEY (`ProductId`) REFERENCES `Product` (`Id`));",
// "CREATE TABLE IF NOT EXISTS `User` (`Id` INT AUTO_INCREMENT NOT NULL,   `Mail` VARCHAR(50) NOT NULL, `Password` NVARCHAR(50) NOT NULL, PRIMARY KEY (`Id`));",
// "CREATE TABLE IF NOT EXISTS `Present` (`Id` INT AUTO_INCREMENT NOT NULL, `Date` DATETIME NOT NULL, `ExpirationDate` DATETIME NOT NULL, `MaxPrice` INT NOT NULL, `Category` INT NOT NULL, `UserId` INT NOT NULL, `GiftCode` INT NOT NULL, PRIMARY KEY (`Id`), FOREIGN KEY (`UserId`) REFERENCES `User` (`Id`), FOREIGN KEY (`Category`) REFERENCES `Category` (`Id`));",

  // "CREATE TABLE IF NOT EXISTS `User` (`Id` INT AUTO_INCREMENT NOT NULL, `Name` NVARCHAR(30) NOT NULL, `Password` NVARCHAR(50) NOT NULL, `Mail` VARCHAR(50) NOT NULL, `Phone` CHAR(10) NOT NULL, `Country` CHAR(10) NULL, `City` CHAR(10) NULL, PRIMARY KEY (`Id`));",
  // "CREATE TABLE IF NOT EXISTS `Business` (`Id` INT NOT NULL, `Society` NVARCHAR(20) NOT NULL, `Name` NVARCHAR(20) NOT NULL, `Password` NVARCHAR(50) NOT NULL, `Phone` CHAR(10) NOT NULL, `Email` NVARCHAR(50) NOT NULL, PRIMARY KEY (`Id`));",
  // "CREATE TABLE IF NOT EXISTS `Category` (`Id` INT AUTO_INCREMENT NOT NULL, `Name` NVARCHAR(50) NOT NULL, PRIMARY KEY (`Id`));",
  // "CREATE TABLE IF NOT EXISTS `Present` (`Id` INT AUTO_INCREMENT NOT NULL, `Date` DATETIME NOT NULL, `ExpirationDate` DATETIME NOT NULL, `MaxPrice` INT NOT NULL, `Category` INT NOT NULL, `UserId` INT NOT NULL, PRIMARY KEY (`Id`), FOREIGN KEY (`UserId`) REFERENCES `User` (`Id`), FOREIGN KEY (`Category`) REFERENCES `Category` (`Id`));",
  // "CREATE TABLE IF NOT EXISTS `Product` (`Id` INT AUTO_INCREMENT NOT NULL, `Name` NVARCHAR(50) NOT NULL, `Image` BLOB NOT NULL, `Category` INT NOT NULL, `BusinessId` INT NOT NULL, `Price` INT NOT NULL, PRIMARY KEY (`Id`), FOREIGN KEY (`BusinessId`) REFERENCES `Business` (`Id`), FOREIGN KEY (`Category`) REFERENCES `Category` (`Id`));",
  // "CREATE TABLE IF NOT EXISTS `SelectPresent` (`Id` INT AUTO_INCREMENT NOT NULL,`PresentId` INT NOT NULL,`CartId` INT NOT NULL,`Price` INT NOT NULL,PRIMARY KEY (`Id`), FOREIGN KEY (`PresentId`) REFERENCES `Present` (`Id`), FOREIGN KEY (`CartId`) REFERENCES `Cart` (`Id`));",
  // //Actualiser les changements
  // "CREATE TABLE IF NOT EXISTS `Cart` (`Id` INT AUTO_INCREMENT NOT NULL, `ProductId` INT NOT NULL, `ProductName` NVARCHAR(50) NOT NULL,`Amount` INT NOT NULL, `Price` INT NOT NULL, PRIMARY KEY (`Id`)), FOREIGN KEY (`ProductId`) REFERENCES `Products` (`Id`));"



  //   "CREATE TABLE IF NOT EXISTS User (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), username VARCHAR(255), email VARCHAR(225) UNIQUE, address VARCHAR(225), phone INT, website VARCHAR(225), company VARCHAR(225))",
  //   "CREATE TABLE IF NOT EXISTS posts (userId INT, FOREIGN KEY (userId) REFERENCES users(id), id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255), body VARCHAR(500))",
  //   "CREATE TABLE IF NOT EXISTS todos (userId INT, FOREIGN KEY (userId) REFERENCES users(id), id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255), completed BOOLEAN)",
  //   "CREATE TABLE IF NOT EXISTS comments (postId INT, FOREIGN KEY (postId) REFERENCES posts(id), id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), email VARCHAR(225), body VARCHAR(500))",
  //   "CREATE TABLE IF NOT EXISTS passwords (email VARCHAR(225) PRIMARY KEY, password VARCHAR(225) ,FOREIGN KEY (email) REFERENCES users(email),FOREIGN KEY (password) REFERENCES users(website))",
];

sqlStatements.forEach((sql) => {
  connection.query(sql, (err, result) => {
    if (err) throw err;
    console.log("Table created");
  });
});
