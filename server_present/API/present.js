const { Router } = require("express");
const app = Router();
const { fetchDataFromTableCondition } = require("../BL/selectCondition");
const { insertToTable } = require("../BL/insertToTable");
const { getProductsFromCategory } = require("../BL/getProductsFromCategory");

function formatDateForMySQL(date) {
  return date.toISOString().slice(0, 19).replace('T', ' ');
}

app.get("/present/:presentId", async (req, res) => {
  try {
    const presentId = req.params.presentId;
    const present = await fetchDataFromTableCondition(
      "Present",
      "Id",
      presentId
    );
    if (present == undefined) res.status(404).send("Product not found");
    res.status(200).send(present[0]);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/checkOrderNumber/:giftCode", async (req, res) => {
  try {
    const giftCode = req.params.giftCode;
    console.log("giftCode: ", giftCode);
    const existingOrder = await fetchDataFromTableCondition(
      "Present",
      "GiftCode",
      giftCode
    );

    if (existingOrder.length > 0) {
      console.log("existingOrder.length", existingOrder.length);
      res.status(200).send({ exists: true });
    } else {
      res.status(200).send({ exists: false });
    }
  } catch (error) {
    console.error("Error checking order number:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/completeOrder", async (req, res) => {
  try {
    const {
      Date: orderDate,
      ExpirationDate: expDate,
      Amount,
      Category,
      UserId,
      GiftCode,
      Buyed,
      DelEmail,
      DelPhoneNumber,
      DelName,
      DelNote,
    } = req.body;

    console.log("QQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ");
    console.log("Received orderDate:", orderDate);
    console.log("Received expDate:", expDate);

    if (isNaN(Date.parse(orderDate)) || isNaN(Date.parse(expDate))) {
      throw new Error("Invalid date format");
    }

    const category = await fetchDataFromTableCondition(
      "Category",
      "Name",
      Category
    );
    console.log("category::::::::::::::::", category);

    if (!category || category.length === 0) {
      return res.status(404).send("Category not found");
    }
    const categoryInt = category[0].Id;
    console.log("categoryInt:aaaaaaaaAAAAAAAA", categoryInt);
    await insertToTable(
      "Present",
      `Date, ExpirationDate, Amount, Category, UserId, GiftCode, Buyed, DelEmail, DelPhoneNumber, DelName, DelNote`,
      [
        formatDateForMySQL(new Date(orderDate)),
        expDate + '-01', 
        Amount,
        categoryInt,
        UserId,
        parseInt(GiftCode, 10),
        Buyed,
        DelEmail,
        DelPhoneNumber,
        DelName,
        DelNote,
      ]
    );

    console.log("Insert to table successful");
    res.status(200).json({ message: "Order completed successfully" });
  } catch (error) {
    console.error("Error completing order:", error);
    res.status(500).send("Internal Server Error");
  }
});

//Le client doit demander le present en fonction du lien et du gift code.
//Si la date d'expiration est passée, ou si Buyed = true, on ne peut pas lui ouvrir le site et on affiche l'erreur correspondante.
// Lorsque l'acheteur confirme sa commande, on change Buyed en true.

module.exports = app;
