const express = require("express");
const cors = require("cors");
const user = require("./user");
const business = require("./business");
const category = require("./category");
const present = require("./present");
const product = require("./product");
const cart = require("./cart");
const selectPresent = require("./selectPresent");
const supplier = require("./supplierAPI");


const app = express();
app.use(cors());
app.use(express.json());

app.use(user);
app.use(supplier);
// app.use(business);
app.use(category);
app.use(present);
app.use(product);
app.use(cart);
app.use(selectPresent);

const PORT = process.env.PORT || 5000; // Change to a different port like 5001

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);

// app.listen(5000, () => {
//   console.log("listening on http://localhost:5000");
});
