var mysql = require("mysql2");

function insertToTable(tableName, columns, parameters) {
    const con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "Moshe26!",
        port: 3306,
        database: "presentDB",
      });
  
  
    con.connect(function (err) {
      if (err) throw err;
      console.log("Connected!");
      var sql = `INSERT INTO ${tableName} (${columns}) VALUES (${parameters})`;
      con.query(sql, function (err, result) {
      if (err) throw err;
      console.log(result.affectedRows + ` 1 record inserted to ${tableName}`);
   });
});
}
      
  
      
//המספרים מסבירים באיזה בדר למלאות את הדטבייס
   
// //User
// 1
// insertToTable('User','Mail, Password' , '"t@gmail.com", "123"');
// insertToTable('User','Mail, Password' , '"rt@gmail.com", "244"');
// insertToTable('User','Mail, Password' , '"ms@gmail.com", "456"');
// insertToTable('User', 'Mail, Password', '"johndoe@example.com", "p@ssW0rd!123"');
// insertToTable('User', 'Mail, Password', '"janedoe@example.com", "j@neD03#456"');
// insertToTable('User', 'Mail, Password', '"alice@example.com", "Al!c3#789"');
// insertToTable('User', 'Mail, Password', '"bob@example.com", "B0b&SeCur3"');
// insertToTable('User', 'Mail, Password', '"charlie@example.com", "Ch@rlie123!"');
// insertToTable('User', 'Mail, Password', '"diana@example.com", "d!@na456"');
// insertToTable('User', 'Mail, Password', '"edward@example.com", "EdW@rd#789"');
// insertToTable('User', 'Mail, Password', '"frank@example.com", "Fr@nkS3cur3"');
// insertToTable('User', 'Mail, Password', '"grace@example.com", "Gr@ce!789"');
// insertToTable('User', 'Mail, Password', '"henry@example.com", "H3nryP@ss"');


// //Business
// 2
// insertToTable('Business', 'Name, Password, Phone, Email, City, Country', '"TechSolutions", "passw0rd@123", "0712345678", "info@techsolutions.com", "Silicon Valley", "USA"');
// insertToTable('Business', 'Name, Password, Phone, Email, City, Country', '"GreenEnergy", "eN3rgy!456", "0812345678", "contact@greenenergy.com", "Amsterdam", "Netherlands"');
// insertToTable('Business', 'Name, Password, Phone, Email, City, Country', '"HealthPlus", "h3@lthP@ss", "0912345678", "support@healthplus.com", "Toronto", "Canada"');
// insertToTable('Business', 'Name, Password, Phone, Email, City, Country', '"EduWorld", "EdU@789", "0612345678", "hello@eduworld.com", "London", "UK"');
// insertToTable('Business', 'Name, Password, Phone, Email, City, Country', '"AutoDrive", "dr1ve!2021", "0512345678", "service@autodrive.com", "Berlin", "Germany"');
// insertToTable('Business', 'Name, Password, Phone, Email, City, Country', '"Foodies", "f00d!lover", "0412345678", "contact@foodies.com", "Paris", "France"');
// insertToTable('Business', 'Name, Password, Phone, Email, City, Country', '"ArtFusion", "Art@F123", "0312345678", "admin@artfusion.com", "Rome", "Italy"');
// insertToTable('Business', 'Name, Password, Phone, Email, City, Country', '"FinTechInnov", "F!nT3ch#789", "0212345678", "finance@fintechinnov.com", "Singapore", "Singapore"');
// insertToTable('Business', 'Name, Password, Phone, Email, City, Country', '"TravelEasy", "Tr@v3l!456", "0112345678", "booking@traveleasy.com", "Sydney", "Australia"');
// insertToTable('Business', 'Name, Password, Phone, Email, City, Country', '"EcoLiving", "eco@l1v1ng", "0712345679", "eco@ecoliving.com", "Vancouver", "Canada"');

// //Present
// 4
// insertToTable('Present', 'Date, ExpirationDate, Amount, Category, UserId, GiftCode, Buyed, DelEmail, DelPhoneNumber, DelName, DelNote', '"2024-07-28 10:00:00", "2025-07-28 10:00:00", "100", "1", "1", "123456", "False", "john.doe@fakemail.com", "0123456789", "John Doe", "Happy Birthday!"');
// insertToTable('Present', 'Date, ExpirationDate, Amount, Category, UserId, GiftCode, Buyed, DelEmail, DelPhoneNumber, DelName, DelNote', '"2024-08-01 12:00:00", "2025-08-01 12:00:00", "50", "2", "2", "234567", "False", "jane.smith@fakemail.com", "0987654321", "Jane Smith", "Congratulations!"');
// insertToTable('Present', 'Date, ExpirationDate, Amount, Category, UserId, GiftCode, Buyed, DelEmail, DelPhoneNumber, DelName, DelNote', '"2024-08-15 14:00:00", "2025-08-15 14:00:00", "75", "3", "3", "345678", "False", "alice.johnson@fakemail.com", "0112233445", "Alice Johnson", "Best wishes!"');
// insertToTable('Present', 'Date, ExpirationDate, Amount, Category, UserId, GiftCode, Buyed, DelEmail, DelPhoneNumber, DelName, DelNote', '"2024-09-01 16:00:00", "2025-09-01 16:00:00", "150", "1", "4", "456789", "False", "bob.brown@fakemail.com", "0223344556", "Bob Brown", "Thank you!"');
// insertToTable('Present', 'Date, ExpirationDate, Amount, Category, UserId, GiftCode, Buyed, DelEmail, DelPhoneNumber, DelName, DelNote', '"2024-09-15 18:00:00", "2025-09-15 18:00:00", "200", "2", "5", "567890", "False", "charlie.green@fakemail.com", "0334455667", "Charlie Green", "Happy Anniversary!"');
// insertToTable('Present', 'Date, ExpirationDate, Amount, Category, UserId, GiftCode, Buyed, DelEmail, DelPhoneNumber, DelName, DelNote', '"2024-10-01 20:00:00", "2025-10-01 20:00:00", "300", "3", "6", "678901", "False", "diana.white@fakemail.com", "0445566778", "Diana White", "Merry Christmas!"');
// insertToTable('Present', 'Date, ExpirationDate, Amount, Category, UserId, GiftCode, Buyed, DelEmail, DelPhoneNumber, DelName, DelNote', '"2024-10-15 22:00:00", "2025-10-15 22:00:00", "400", "1", "7", "789012", "False", "edward.black@fakemail.com", "0556677889", "Edward Black", "Get well soon!"');
// insertToTable('Present', 'Date, ExpirationDate, Amount, Category, UserId, GiftCode, Buyed, DelEmail, DelPhoneNumber, DelName, DelNote', '"2024-11-01 08:00:00", "2025-11-01 08:00:00", "500", "2", "8", "890123", "False", "frank.blue@fakemail.com", "0667788990", "Frank Blue", "Good luck!"');
// insertToTable('Present', 'Date, ExpirationDate, Amount, Category, UserId, GiftCode, Buyed, DelEmail, DelPhoneNumber, DelName, DelNote', '"2024-11-15 09:00:00", "2025-11-15 09:00:00", "600", "3", "9", "901234", "False", "grace.yellow@fakemail.com", "0778899001", "Grace Yellow", "Bon voyage!"');
// insertToTable('Present', 'Date, ExpirationDate, Amount, Category, UserId, GiftCode, Buyed, DelEmail, DelPhoneNumber, DelName, DelNote', '"2024-12-01 10:00:00", "2025-12-01 10:00:00", "700", "1", "10", "012345", "False", "henry.orange@fakemail.com", "0889900112", "Henry Orange", "Welcome home!"');


// //Category
// 3
//insertToTable('Category', 'Name', "'Decorations'");
// insertToTable('Category', 'Name', "'Clothes'");
// insertToTable('Category', 'Name', "'Jewelry'");
// insertToTable('Category', 'Name', "'Toys'");
// insertToTable('Category', 'Name', "'Electronics'");
// insertToTable('Category', 'Name', "'Books'");
// insertToTable('Category', 'Name', "'Sports Equipment'");
// insertToTable('Category', 'Name', "'Beauty Products'");
// insertToTable('Category', 'Name', "'Home Appliances'");
// insertToTable('Category', 'Name', "'Groceries'");


// //Product
// 5
// insertToTable('Product', 'Name, Image, Category, BusinessId, Price, Description', '"Modern Sofa", "https://i.pinimg.com/736x/56/93/43/5693432ac9e03b7cf8a4aec5bb7eff50.jpg", "1", "1", "899.99", "Comfortable modern sofa"');
// insertToTable('Product', 'Name, Image, Category, BusinessId, Price, Description', '"Designer Dress", "img/Colthes/designer_dress.jpeg", "2", "2", "299.99", "Stylish designer dress"');
// insertToTable('Product', 'Name, Image, Category, BusinessId, Price, Description', '"Diamond Ring", "img/Jewelry/diamond_ring.jpeg", "3", "3", "1999.99", "Elegant diamond ring"');
// insertToTable('Product', 'Name, Image, Category, BusinessId, Price, Description', '"Action Figure", "img/Toys/action_figure.jpeg", "4", "4", "49.99", "Popular action figure"');
// insertToTable('Product', 'Name, Image, Category, BusinessId, Price, Description', '"Smartphone", "img/Electronics/smartphone.jpeg", "5", "5", "799.99", "Latest model smartphone"');
// insertToTable('Product', 'Name, Image, Category, BusinessId, Price, Description', '"Fantasy Novel", "img/Books/fantasy_novel.jpeg", "6", "6", "19.99", "Best-selling fantasy novel"');
// insertToTable('Product', 'Name, Image, Category, BusinessId, Price, Description', '"Yoga Mat", "img/Sports_Equipment/yoga_mat.jpeg", "7", "7", "29.99", "Eco-friendly yoga mat"');
// insertToTable('Product', 'Name, Image, Category, BusinessId, Price, Description', '"Lipstick Set", "img/Beauty_Products/lipstick_set.jpeg", "8", "8", "49.99", "Variety of lipstick shades"');
// insertToTable('Product', 'Name, Image, Category, BusinessId, Price, Description', '"Microwave Oven", "img/Home_Appliances/microwave_oven.jpeg", "9", "9", "129.99", "Compact microwave oven"');
// insertToTable('Product', 'Name, Image, Category, BusinessId, Price, Description', '"Organic Apples", "img/Groceries/organic_apples.jpeg", "10", "10", "5.99", "Fresh organic apples"');
//insertToTable('Product', 'Name, Image, Category, BusinessId, Price, Description', 'Wooden Coffee Table, img/wooden_coffee_table.jpg, 1, 1, 199.99, Elegant wooden coffee table');
// insertToTable('Product', 'Name, Image, Category, BusinessId, Price, Description', 'Leather Jacket, img/leather_jacket.jpg, 2, 2, 249.99, Stylish leather jacket');
// insertToTable('Product', 'Name, Image, Category, BusinessId, Price, Description', 'Gold Necklace, img/gold_necklace.jpg, 3, 3, 1499.99, Beautiful gold necklace');
// insertToTable('Product', 'Name, Image, Category, BusinessId, Price, Description', 'Stuffed Animal, img/stuffed_animal.jpg, 4, 4, 29.99, Cute stuffed animal');
// insertToTable('Product', 'Name, Image, Category, BusinessId, Price, Description', 'Laptop, img/laptop.jpg, 5, 5, 1099.99, High-performance laptop');
// insertToTable('Product', 'Name, Image, Category, BusinessId, Price, Description', 'Cookbook, img/cookbook.jpg, 6, 6, 24.99, Comprehensive cookbook');
// insertToTable('Product', 'Name, Image, Category, BusinessId, Price, Description', 'Tennis Racket, img/tennis_racket.jpg, 7, 7, 79.99, Professional tennis racket');
// insertToTable('Product', 'Name, Image, Category, BusinessId, Price, Description', 'Skincare Set, img/skincare_set.jpg, 8, 8, 59.99, Complete skincare set');
// insertToTable('Product', 'Name, Image, Category, BusinessId, Price, Description', 'Blender, img/blender.jpg, 9, 9, 89.99, Powerful kitchen blender');
// insertToTable('Product', 'Name, Image, Category, BusinessId, Price, Description', 'Organic Bananas, img/organic_bananas.jpg, 10, 10, 3.99, Fresh organic bananas');
// insertToTable('Product', 'Name, Image, Category, BusinessId, Price, Description', 'Decorative Vase, img/decorative_vase.jpg, 1, 1, 49.99, Beautiful decorative vase');
// insertToTable('Product', 'Name, Image, Category, BusinessId, Price, Description', 'Winter Coat, img/winter_coat.jpg, 2, 2, 199.99, Warm winter coat');
// insertToTable('Product', 'Name, Image, Category, BusinessId, Price, Description', 'Silver Bracelet, img/silver_bracelet.jpg, 3, 3, 299.99, Elegant silver bracelet');
// insertToTable('Product', 'Name, Image, Category, BusinessId, Price, Description', 'Board Game, img/board_game.jpg, 4, 4, 39.99, Fun family board game');
// insertToTable('Product', 'Name, Image, Category, BusinessId, Price, Description', 'Tablet, img/tablet.jpg, 5, 5, 499.99, Versatile tablet');
// insertToTable('Product', 'Name, Image, Category, BusinessId, Price, Description', 'Science Fiction Novel, img/scifi_novel.jpg, 6, 6, 14.99, Exciting science fiction novel');
// insertToTable('Product', 'Name, Image, Category, BusinessId, Price, Description', 'Basketball, img/basketball.jpg, 7, 7, 29.99, Durable basketball');
// insertToTable('Product', 'Name, Image, Category, BusinessId, Price, Description', 'Perfume, img/perfume.jpg, 8, 8, 79.99, Luxurious perfume');
// insertToTable('Product', 'Name, Image, Category, BusinessId, Price, Description', 'Toaster, img/toaster.jpg, 9, 9, 49.99, Two-slice toaster');
// insertToTable('Product', 'Name, Image, Category, BusinessId, Price, Description', 'Organic Carrots, img/organic_carrots.jpg, 10, 10, 2.99, Fresh organic carrots');

//Cart
// 6
// insertToTable('Cart', 'ProductId, ProductName, Amount, Price, PresentId', '"1", "Modern Sofa", "1", "899.99", "21"');
// insertToTable('Cart', 'ProductId, ProductName, Amount, Price, PresentId', '"2", "Designer Dress", "2", "299.99", "22"');
// insertToTable('Cart', 'ProductId, ProductName, Amount, Price, PresentId', '"3", "Diamond Ring", "1", "1999.99", "23"');
// insertToTable('Cart', 'ProductId, ProductName, Amount, Price, PresentId', '"4", "Action Figure", "5", "49.99", "24"');
// insertToTable('Cart', 'ProductId, ProductName, Amount, Price, PresentId', '"5", "Smartphone", "1", "799.99", "25"');
// insertToTable('Cart', 'ProductId, ProductName, Amount, Price, PresentId', '"6", "Fantasy Novel", "3", "19.99", "26"');
// insertToTable('Cart', 'ProductId, ProductName, Amount, Price, PresentId', '"7", "Yoga Mat", "2", "29.99", "27"');
// insertToTable('Cart', 'ProductId, ProductName, Amount, Price, PresentId', '"8", "Lipstick Set", "1", "49.99", "28"');
// insertToTable('Cart', 'ProductId, ProductName, Amount, Price, PresentId', '"9", "Microwave Oven", "1", "129.99", "29"');
// insertToTable('Cart', 'ProductId, ProductName, Amount, Price, PresentId', '"10", "Organic Apples", "10", "5.99", "30"');
// insertToTable('Cart', 'ProductId, ProductName, Amount, Price, PresentId', '"11", "Wooden Coffee Table", "1", "199.99", "21"');
// insertToTable('Cart', 'ProductId, ProductName, Amount, Price, PresentId', '"12", "Leather Jacket", "1", "249.99", "22"');
// insertToTable('Cart', 'ProductId, ProductName, Amount, Price, PresentId', '"13", "Gold Necklace", "1", "1499.99", "23"');
// insertToTable('Cart', 'ProductId, ProductName, Amount, Price, PresentId', '"14", "Stuffed Animal", "3", "29.99", "24"');
// insertToTable('Cart', 'ProductId, ProductName, Amount, Price, PresentId', '"15", "Laptop", "1", "1099.99", "25"');
// insertToTable('Cart', 'ProductId, ProductName, Amount, Price, PresentId', '"16", "Cookbook", "2", "24.99", "26"');
// insertToTable('Cart', 'ProductId, ProductName, Amount, Price, PresentId', '"17", "Tennis Racket", "1", "79.99", "27"');
// insertToTable('Cart', 'ProductId, ProductName, Amount, Price, PresentId', '"18", "Skincare Set", "1", "59.99", "28"');
// insertToTable('Cart', 'ProductId, ProductName, Amount, Price, PresentId', '"19", "Blender", "1", "89.99", "29"');
// insertToTable('Cart', 'ProductId, ProductName, Amount, Price, PresentId', '"20", "Organic Bananas", "6", "3.99", "30"');


// "CREATE TABLE IF NOT EXISTS `Business` (`Id` INT AUTO_INCREMENT NOT NULL, `Name` NVARCHAR(20) NOT NULL, `Password` NVARCHAR(50) NOT NULL, `Phone` CHAR(10) NOT NULL, `Email` NVARCHAR(50) NOT NULL, `City` NVARCHAR(50) NOT NULL, `Country` NVARCHAR(50) NOT NULL, PRIMARY KEY (`Id`));",
// "CREATE TABLE IF NOT EXISTS `Category` (`Id` INT AUTO_INCREMENT NOT NULL, `Name` NVARCHAR(50) NOT NULL, PRIMARY KEY (`Id`));",
//  "CREATE TABLE IF NOT EXISTS `Product` (`Id` INT AUTO_INCREMENT NOT NULL, `Name` NVARCHAR(50) NOT NULL, `Image` VARCHAR(255) NOT NULL, `Category` INT NOT NULL, `BusinessId` INT NOT NULL, `Price` DECIMAL(10, 2) NOT NULL, `Description` NVARCHAR(50) NOT NULL,PRIMARY KEY (`Id`), FOREIGN KEY (`BusinessId`) REFERENCES `Business` (`Id`), FOREIGN KEY (`Category`) REFERENCES `Category` (`Id`));",
//  "CREATE TABLE IF NOT EXISTS `Cart` (`Id` INT AUTO_INCREMENT NOT NULL, `ProductId` INT NOT NULL, `ProductName` NVARCHAR(50) NOT NULL,`Amount` INT NOT NULL, `Price` NVARCHAR(50) NOT NULL, `PresentId` INT NOT NULL, PRIMARY KEY (`Id`), FOREIGN KEY (`ProductId`) REFERENCES `Product` (`Id`), FOREIGN KEY (`PresentId`) REFERENCES `Present` (`Id`));",
// "CREATE TABLE IF NOT EXISTS `User` (`Id` INT AUTO_INCREMENT NOT NULL,   `Mail` VARCHAR(50) NOT NULL, `Password` NVARCHAR(50) NOT NULL, PRIMARY KEY (`Id`));",
// "CREATE TABLE IF NOT EXISTS `Present` ( `Id` INT AUTO_INCREMENT NOT NULL,`Date` DATETIME NOT NULL,`ExpirationDate` DATETIME NOT NULL, `Amount` NVARCHAR(50) NOT NULL, `Category` INT NOT NULL, `UserId` INT NOT NULL, `GiftCode` INT NOT NULL, `Buyed` NVARCHAR(50) NOT NULL, `DelEmail` NVARCHAR(50) NOT NULL, `DelPhoneNumber` NVARCHAR(50) NOT NULL, `DelName` NVARCHAR(50) NOT NULL, `DelNote` NVARCHAR(50) NOT NULL, PRIMARY KEY (`Id`), FOREIGN KEY (`UserId`) REFERENCES `User` (`Id`), FOREIGN KEY (`Category`) REFERENCES `Category` (`Id`));",

