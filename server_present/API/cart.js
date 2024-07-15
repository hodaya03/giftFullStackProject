const { Router } = require('express');
const { fetchDataFromTableCondition } = require("../BL/selectCondition");
const { insertToTable } = require("../BL/insertToTable");
const { updateTable } = require("../BL/updateTable");
const { deleteFromTable } = require("../BL/deleteFromTable");
const app = Router();

// POST method to add data to users table
//Soit comme ca, soit /products/ et verifier si id
app.post("/products/:id", async (req, res) => {

    const { Id, Name, Amount, Price } = req.body;
    try {
        
      insertToTable(
        "Cart",
        `ProductId, ProductName, Amount, Price`,
        `'${Id}', '${Name}', '${Amount}', '${Price}'`
      );
      res.status(200).send("Product added successfully");
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).send("Internal Server Error");
    }
  });

  // DELETE method to delete data from users table
app.delete("/products/:id", async (req, res) => {
    try {
      let productId = req.params.id;
      deleteFromTable("Cart", "Id", `${productId}`);
      res.status(200).send("Product deleted successfully");
    } catch (error) {
      console.error("Error deleting product:", error);
      res.status(500).send("Internal Server Error");
    }
  });

  //Pour afficher le panier
  app.get("/:presentId", async (req, res) => {
    const { presentId } = req.params.presentId;
    try {
  
        const myCart = fetchDataFromTableCondition("Cart", "PresentId", presentId);
       
        if (myCart.length === 0) {
            return res.status(404).json({ error: 'Cart not found' });
        }
        
        res.json(myCart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  module.exports = app;