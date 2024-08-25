const { Router } = require("express");
const app = Router();
const { fetchDataFromTable } = require("../BL/readTable");
const { fetchDataFromTableCondition } = require("../BL/selectCondition");
const { insertToTable } = require("../BL/insertToTable");
const { getProductsFromCategory } = require("../BL/getProductsFromCategory");

app.get("/home/", async (req, res) => {
  //console.log("req222222");

  // console.log("req", req);
  //console.log("req.query.categoryName", req.query.categoryName);
  //console.log("req333333");

  try {
    let categ = req.query.categoryName;
    const categories = await fetchDataFromTable("Category");
    //console.log("categories", categories);

    if (categories == undefined) res.status(404).send("No Category found");
    res.status(200).send(categories);
  } catch (error) {
    //console.error("Error fetching Categories:", error);
    res.status(500).send("Internal Server Error");
  }
});

//Amene tous les produits de la category demandee
app.get("/productsfrom/:name", async (req, res) => {
  try {
    const name = req.params.name;
    //console.log('Category name:', name);

    // console.log('name', name);
    const categ = await fetchDataFromTableCondition("Category", "Name", name);
    // console.log('Category found:', categ);

    if (!categ || categ.length === 0) {
      return res.status(404).send("Category not found");
    }
    //console.log(id)
    const products = await getProductsFromCategory(categ[0].Id);
    console.log("Products found:", products);

    if (!products || products.length === 0) {
      return res.status(404).send("Products from this category not found");
    }
    res.status(200).send(products);
  } catch (error) {
    console.error("Error fetching Products:", error);
    res.status(500).send("Internal Server Error");
  }
});

//Amene tous les produits de la category demandee
app.get("/productsfor/:id", async (req, res) => {
  try {
    const idCategory = req.params.id;
    const products = await getProductsFromCategory(idCategory);
    // console.log('Products found:', products);

    if (!products || products.length === 0) {
      return res.status(404).send("Products from this category not found");
    }
    res.status(200).send(products);
  } catch (error) {
    console.error("Error fetching Products:", error);
    res.status(500).send("Internal Server Error");
  }
});

//Amene tous les produits de la category demandee
app.get("/productname/:id", async (req, res) => {
  try {
    const idCategory = req.params.id;
    // console.log('idCategory', idCategory);
    const categ = await fetchDataFromTableCondition(
      "Category",
      "Id",
      idCategory
    );

    if (!categ || categ.length === 0) {
      return res.status(404).send("Category not found");
    }

    const categName = categ[0].Name;
    //console.log('categName', categName);

    res.status(200).send(categName);
  } catch (error) {
    console.error("Error fetching Products:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/categories", async (req, res) => {
  try {
    //console.log("hi22");
    const categories = await fetchCategoriesNameAndId();
    if (!categories || categories.length === 0) {
      return res.status(404).send("No categories found");
    }
    res.status(200).send(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).send("Internal Server Error");
  }
});

async function fetchCategoriesNameAndId() {
  const categories = await fetchDataFromTable("Category");
  return categories.map((category) => ({
    id: category.Id,
    name: category.Name,
  }));
}

module.exports = app;
