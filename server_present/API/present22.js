const { Router } = require('express');
const app = Router();
const { fetchDataFromTableCondition } = require('../BL/selectCondition');

//Recupere le present
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
      res.status(200).send({ exists: true });
    } else {
      res.status(200).send({ exists: false });
    }
  } catch (error) {
    console.error("Error checking order number:", error);
    res.status(500).send("Internal Server Error");
  }
});

// app.post("/completeOrder", async (req, res) => {
//   try {
//     const orderDetails = req.body;

//     await insertToTable('Present', orderDetails);
//     res.status(200).send("Order completed successfully");
//   } catch (error) {
//     console.error("Error completing order:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });

//Le client doit demander le present en fonction du lien et du gift code.
//Si la date d'expiration est passée, ou si Buyed = true, on ne peut pas lui ouvrir le site et on affiche l'erreur correspondante.
// Lorsque l'acheteur confirme sa commande, on change Buyed en true.

module.exports = app;
