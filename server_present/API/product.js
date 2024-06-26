const { Router } = require('express');
const app = Router();



//Amene tous les details du produit dont l'id est la 
app.get("/productsId/:id", async (req, res) => {
    try {
      let productId = req.params.id;
      const product = await fetchDataFromTableCondition(
        "Products",
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

  module.exports = app;