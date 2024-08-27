const { Router } = require("express");
const app = Router();
const { fetchDataFromTableCondition } = require("../BL/selectCondition");
const { getProductsFromCategory } = require("../BL/getProductsFromCategory");
const { fetchDataWithJoin } = require("../BL/fetchDataWithJoin");

app.get("/api/gifts/:idGift", async (req, res) => {
  try {
    // console.log('req.params', req.params);
    const idGift = req.params.idGift;
    // console.log('idGift', idGift);

    // Assurez-vous que fetchDataFromTableCondition est bien une fonction asynchrone
    const myGiftCard = await fetchDataFromTableCondition(
      "Present",
      "GiftCode",
      idGift
    );

    console.log("Fetched data:", myGiftCard);
    console.log("amount", myGiftCard[0].Amount);

    if (!myGiftCard || myGiftCard.length === 0) {
      return res.status(404).json({ error: "Gift not found" });
    }

    if (myGiftCard[0].Buyed === "true") {
      return res.status(400).json({ error: "You already bought your present" });
    }

    const currentDate = new Date();
    const expirationDate = new Date(myGiftCard[0].ExpirationDate);

    if (expirationDate < currentDate) {
      return res.status(400).json({ error: "Time out" });
    }

    const presentId = myGiftCard[0].Id;

    const categories = await fetchDataWithJoin(
      "PresentCategories",
      "Present",
      "PresentCategories.PresentId",
      "Present.Id",
      "PresentCategories.PresentId",
      presentId
    );

    if (!categories || categories.length === 0) {
      return res
        .status(404)
        .json({ error: "No categories found for this gift" });
    }
    console.log("categories", categories);

    const categoryIds = categories.map((category) => category.CategoryId);

    // const category = myGiftCard[0].Category;

    // const myProducts = await getProductsFromCategory(category);

    const myProducts = await getProductsFromCategory(categoryIds);

    const selectedProducts = await fetchDataFromTableCondition(
      "cart",
      "PresentId",
      presentId
    );

    console.log("amount", myGiftCard[0].Amount);

    const allDetails = {
      Id: myGiftCard[0].Id,
      Date: myGiftCard[0].Date,
      ExpirationDate: myGiftCard[0].ExpirationDate,
      //   Category: myGiftCard[0].Category,
      Category: categoryIds,
      Amount: myGiftCard[0].Amount,
    };

    res.json({
      giftDetails: allDetails, // Assurez-vous que c'est bien Amount et non maxPrice
      products: myProducts,
      selectedProducts: selectedProducts || [], // Return selected products if any
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = app;
