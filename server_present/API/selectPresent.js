

const { Router, json } = require("express");
const app = Router();
const {fetchDataFromTableCondition} = require("../BL/selectCondition");
const { getProductsFromCategory } = require("../BL/getProductsFromCategory");

app.get('/api/gifts/:idGift', async (req, res) => {
    const { idGift } = req.params;
    try {
        // idGift=req.body;
        const myGiftCard = fetchDataFromTableCondition("Present", "GiftCode", idGift);
       
        if (myGiftCard.length === 0) {
            return res.status(404).json({ error: 'Gift not found' });
        }
        const category = myGiftCard[0].Category;
        const myProducts = await getProductsFromCategory(category);
        // console.log("category = "+json(myGiftCard[0].Category));
        // const myProducts = getProductsFromCategory(json(myGiftCard[0].Category))
        
        res.json(myProducts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = app;
