const { Router } = require('express');
const app = Router();
const { fetchDataFromTableCondition } = require("../BL/selectCondition");
const { insertToTable } = require("../BL/insertToTable");
const { updateTable } = require("../BL/updateTable");
const { deleteFromTable } = require("../BL/deleteFromTable");


// POST method to add data to users table
//Soit comme ca, soit /products/ et verifier si id
// app.post("/products/:productId", async (req, res) => {

//   const { ProductId, ProductName, Amount, Price, PresentId } = req.body;

//   try {
//     await insertToTable(
//       "Cart",
//       ["ProductId", "ProductName", "Amount", "Price", "PresentId"],
//       [ProductId, ProductName, Amount, Price, PresentId]
//     );
//     res.status(200).json({message: "Product added successfully to Cart"});
//   } catch (error) {
//     console.error("Error adding product:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });
    
   
 

  // DELETE method to delete data from users table
app.delete("/cart/:presentId/product/:productId", async (req, res) => {
    try {
      const productId = req.params.productId;
      deleteFromTable("Cart", "ProductId", productId);
      res.status(200).send("Product deleted successfully");
    } catch (error) {
      console.error("Error deleting product:", error);
      res.status(500).send("Internal Server Error");
    }
  });

  //Pour afficher le panier
  app.get("/cart/:presentId", async (req, res) => {
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

  app.put("/products/:productId", async (req, res) => {
    try {
      const productId = req.params.productId;
      const amount = req.body.quantity;
      updateTable("Cart", `Amount = ${amount}`, `ProductId = ${productId}`);
      res.status(200).json({message: "Amount updated successfully"});
    } catch (error) {
      console.error("Error deleting product:", error);
      res.status(500).send("Internal Server Error");
    }
  });

  module.exports = app;