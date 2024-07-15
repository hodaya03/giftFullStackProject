

const { Router } = require("express");
const app = Router();
const {fetchDataFromTableCondition} = require("../BL/selectCondition");
const { getProductsFromCategory } = require("../BL/getProductsFromCategory");

app.get('/api/gifts/:idGift', async (req, res) => {
    try {
        console.log('req.params', req.params);
        const idGift = req.params.idGift;
        console.log('idGift', idGift);

        // Assurez-vous que fetchDataFromTableCondition est bien une fonction asynchrone
        const myGiftCard = await fetchDataFromTableCondition("Present", "GiftCode", idGift);

        console.log('Fetched data:', myGiftCard);

        if (!myGiftCard || myGiftCard.length === 0) {
            return res.status(404).json({ error: 'Gift not found' });
        }

        if (myGiftCard[0].Buyed === 'true') {
            return res.status(400).json({ error: "You already bought your present" });
        }

        const currentDate = new Date();
        const expirationDate = new Date(myGiftCard[0].ExpirationDate);

        if (expirationDate < currentDate) {
            return res.status(400).json({ error: "Time out" });
        }

        const category = myGiftCard[0].Category;
        console.log("category", category);

        const myProducts = await getProductsFromCategory(category);
        console.log('myProducts', myProducts);

        const allDetails = {Id: myGiftCard[0].Id, Date:  myGiftCard[0].Date, ExpirationDate:  myGiftCard[0].ExpirationDate, Category:  myGiftCard[0].Category, Amount: myGiftCard[0].Amount}

        res.json({
            giftDetails: allDetails,  // Assurez-vous que c'est bien Amount et non maxPrice
            products: myProducts,
             
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



module.exports = app;
