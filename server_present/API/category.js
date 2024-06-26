const { Router } = require('express');
const app = Router();



//Amene tous les produits de la category demandee
app.get("/products/", async (req, res) => {
    try {
        let categ = req.query.category;
        let id = req.query.id;
        //console.log(categ)
        //console.log(id)
       const products = await getProductsFromCategory(categ);
      if (products == undefined) res.status(404).send("Products from this category not found");
      res.status(200).send(categ);
    } catch (error) {
      console.error("Error fetching Products:", error);
      res.status(500).send("Internal Server Error");
    }
  });

  module.exports = app;