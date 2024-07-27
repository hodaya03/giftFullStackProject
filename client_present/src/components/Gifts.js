import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GoToServer } from '../fetch';
import GiftDetails from './GiftDetails';
import ProductsToChoose from './ProductsToChoose';
import '../css/Gifts.css'; // Import the CSS file

export default function Gift() {
    const { idGift } = useParams();
    const [giftData, setGiftData] = useState({});
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [availableProducts, setAvailableProducts] = useState([]);
    const [viewProducts, setViewProducts] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchGiftData = async () => {
            try {
                const query = `/api/gifts/${idGift}`;
                const response = await GoToServer(query, 'GET');
                setGiftData(response.giftDetails);
                setProducts(response.products);
                setTotalPrice(response.giftDetails.Amount);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchGiftData();
    }, [idGift]);

    useEffect(() => {
        const filterProducts = () => {
            const filteredProducts = products.filter(
                (product) => parseInt(product.Price, 10) <= giftData.Amount
            );
            setAvailableProducts(filteredProducts);
        };

        if (products.length > 0 && giftData.Amount) {
            filterProducts();
        }
    }, [products, giftData.Amount]);

    const handleProductSelect = async (product) => {
        const newBudget = totalPrice - product.Price;
        console.log("newBudget", newBudget)
        console.log("totalPrice", totalPrice)

        const existingProduct = selectedProducts.find(p => p.Id === product.Id);

        // const orderData = {
        //     ProductId: product.Id,
        //     ProductName: product.Name,
        //     Amount: 1,
        //     Price: product.Price,
        //     PresentId: parseInt(idGift, 10)
        // };

        if (newBudget >= 0) {
            try {
                const query = `/products/${product.Id}`;
                let response;

                if (existingProduct) {
                    const updatedProduct = { ...existingProduct, Amount: existingProduct.Amount + 1 };
                    console.log('updatedProduct', updatedProduct);
                    response = await GoToServer(query, "PUT", updatedProduct);
                    setSelectedProducts(selectedProducts.map(p => 
                        p.Id === product.Id ? updatedProduct : p
                    ));
                } else {
                    const orderData = {
                        ProductId: product.Id,
                        ProductName: product.Name,
                        Amount: 1,
                        Price: product.Price,
                        PresentId: parseInt(idGift, 10)
                    };
                    response = await GoToServer(query, "POST", orderData);
                    setSelectedProducts([...selectedProducts, orderData]);
                }

                alert(response.message);
                setTotalPrice(newBudget);
                setAvailableProducts(
                    availableProducts.filter(p => product.Price <= newBudget)
                );
                
            } catch (error) {
                console.error('Error:', error);
            }
        } else {
            alert('Selected product exceeds the maximum price limit.');
        }
    };

    const goToChooseGift = () => {
        setViewProducts(true);
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!giftData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>You received a gift !! </h1>
            {viewProducts ? (
                <ProductsToChoose 
                    availableProducts={availableProducts} 
                    selectedProducts={selectedProducts} 
                    handleProductSelect={handleProductSelect} 
                />
            ) : (
                <GiftDetails giftData={giftData} goToChooseGift={goToChooseGift} />
            )}
        </div>
    );
}


// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { GoToServer, GoToServer1 } from '../fetch';
// import GiftDetails from './GiftDetails';
// import ProductsToChoose from './ProductsToChoose';
// import '../css/Gifts.css'; // Import the CSS file

// export default function Gift() {
//     const { idGift } = useParams();
//     const [giftData, setGiftData] = useState({});
//     const [products, setProducts] = useState([]);
//     const [error, setError] = useState(null);
//     const [totalPrice, setTotalPrice] = useState(0);
//     const [selectedProducts, setSelectedProducts] = useState([]);
//     const [availableProducts, setAvailableProducts] = useState([]);
//     const [viewProducts, setViewProducts] = useState(false);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchGiftData = async () => {
//             try {
//                 console.log('idGift', idGift);
//                 const query = `/api/gifts/${idGift}`;
//                 const response = await GoToServer(query, 'GET');
//                 console.log('response', response);
//                 console.log('response.giftDetails', response.giftDetails);
//                 console.log('response.products', response.products);

//                 setGiftData(response.giftDetails);
//                 setProducts(response.products);
//                 setTotalPrice(response.giftDetails.Amount);
//                 console.log('totalPrice', totalPrice);
//                 console.log('availableProducts', availableProducts);
//                 //setAvailableProducts(response.products.filter(product => product.Price <= giftData.Amount));
//             } catch (error) {
//                 setError(error.message);
//             }
//         };

//         fetchGiftData();
//     }, [idGift]);


//     useEffect(() => {
//         const filterProducts = () => {
//             console.log('products2', products);
//             let filteredProducts = [];
//             products.forEach(prod => {
//                 console.log('product', prod);
//                 const price = parseInt(prod.Price, 10);
//                 if( price <= giftData.Amount) {
//                     filteredProducts = [...filteredProducts,prod];
//                 }

//             });
//             //  filteredProducts = products.filter((product) => product.Price <= giftData.Amount);
//             console.log("filteredProducts", filteredProducts)
//             setAvailableProducts(filteredProducts);
//         };

//         filterProducts();
//     }, [products, giftData.Amount]);

//     const handleProductSelect = (product) => {
//         console.log('product', product);
//         const newBudget = giftData.Amount - product.Price;
//         console.log('newBudget', newBudget);

//         const orderData = {
//             ProductId: product.Id,
//             ProductName: product.Name,
//             Amount: 1,
//             Price: product.Price,
//             PresentId: parseInt(idGift, 10)
//           };

//           console.log('orderData', orderData);

//         if (newBudget > 0) {
//             setTotalPrice(newBudget);
//             const query = `/products/${product.Id}`;
//             GoToServer(query, "POST", orderData)
//             .then((response) => {
//                 alert(response.message);
//                 setSelectedProducts([...selectedProducts, product]);
//                 setAvailableProducts(
//                     availableProducts.filter(p => p.Id !== product.Id && p.Price <= totalPrice)
//                 );
//                 console.log("availableProducts", availableProducts);
//             })
//             .catch((error) => {
//                 console.error('Error:', error);
//             })
//         }
//         else {
//             alert('Selected product exceeds the maximum price limit.')
//         };
   
        


//     };

//     const goToChooseGift = () => {
//         setViewProducts(true);
//     };

//     if (error) {
//         return <div>Error: {error}</div>;
//     }

//     if (!giftData) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div>
//             <h1>You received a gift !! </h1>
//             {viewProducts ? (
//                 <ProductsToChoose 
//                     availableProducts={availableProducts} 
//                     selectedProducts={selectedProducts} 
//                     handleProductSelect={handleProductSelect} 
//                 />
//             ) : (
//                 <GiftDetails giftData={giftData} goToChooseGift={goToChooseGift} />
//             )}

//             {/* <h2>Available Products</h2>
//             <ul>
//                 {availableProducts.map((product, index) => (
//                     <li key={index}>
//                         {product.Name} - ${product.Price}
//                         <button onClick={() => handleProductSelect(product)}>Select</button>
//                     </li>
//                 ))}
//             </ul>

//             <h2>Selected Products</h2>
//             <ul>
//                 {selectedProducts.map((product, index) => (
//                     <li key={index}>
//                         {product.Name} - ${product.Price}
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );*/ }
//     </div>
//     )}

