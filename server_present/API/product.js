const { Router } = require('express');
const app = Router();
const { fetchDataFromTableCondition } = require('../BL/selectCondition');
const { insertToTable } = require('../BL/insertToTable');


//Amene tous les details du produit dont l'id est la 
app.get("/product/:id", async (req, res) => {
    try {
      const productId = req.params.id;
      const product = await fetchDataFromTableCondition(
        "Product",
        "Id",
        productId
      );
      if (product == undefined) res.status(404).send("Product not found");
      res.status(200).send(product[0]);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).send("Internal Server Error");
    }
  });

//   // Route pour ajouter un produit
// app.post("/products/:id", async (req, res) => {
//   const { Name, Image, Category, BusinessId, Price, Description } = req.body;

//   try {
//     await insertToTable(
//       "Product",
//       ["Name", "Image", "Category", "BusinessId", "Price", "Description"],
//       [Name, Image, Category, BusinessId, Price, Description]
//     );
//     res.status(200).json({message: "Product added successfully"});
//   } catch (error) {
//     console.error("Error adding product:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });

  // Route pour ajouter un produit
app.post("/products/:id", async (req, res) => {
  const { ProductId, ProductName, Amount, Price, PresentId } = req.body;

  const pres = await fetchDataFromTableCondition("Present", "GiftCode", PresentId);
  console.log('pres', pres);
  const presId = pres[0].Id;
  console.log('presId', presId);

  try {
    await insertToTable(
      "Cart",
      ["ProductId", "ProductName", "Amount", "Price", "PresentId"],
      [ProductId, ProductName, Amount, Price, presId]
    );
    res.status(200).json({message: "Product added successfully"});
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).send("Internal Server Error");
  }
});


// Effacer un produit
app.delete("/products/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    deleteFromTable("Product", "Id", `${productId}`);
    res.status(200).send("Product deleted successfully");
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).send("Internal Server Error");
  }
});

  module.exports = app;