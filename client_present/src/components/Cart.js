import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GoToServer } from '../fetch';
import '../css/Cart.css'; // Assurez-vous d'avoir un fichier CSS pour styliser le panier

export default function Cart() {
    const { presentId } = useParams();
    const [cartProducts, setCartProducts] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCartData = async () => {
            try {
                const query = `/cart/${presentId}`;
                const response = await GoToServer(query, 'GET');
                setCartProducts(response.products);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchCartData();
    }, [presentId]);

    const handleProductDetails = (productId) => {
        navigate(`/product/${productId}`);
    };

    const handleDeleteProduct = async (productId) => {
        try {
            const query = `/cart/${presentId}/product/${productId}`;
            await GoToServer(query, 'DELETE');
            setCartProducts(cartProducts.filter(product => product.Id !== productId));
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleQuantityChange = async (productId, newQuantity) => {
        if (newQuantity <= 0) {
            return handleDeleteProduct(productId);
        }

        try {
            const query = `/products/${productId}`;
            const body = { quantity: newQuantity };
            const resp = await GoToServer(query, 'PUT', body);
            console.log("resp", resp.message);
            setCartProducts(cartProducts.map(product => 
                product.Id === productId ? { ...product, quantity: newQuantity } : product
            ));
        } catch (error) {
            console.error('Error:', error);
        }
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!cartProducts) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Cart</h1>
            <ul>
                {cartProducts.map((product, index) => (
                    <li key={index}>
                        <img src={product.imageUrl} alt={product.Name} onClick={() => handleProductDetails(product.Id)} />
                        <span>{product.Name} - ${product.Price}</span>
                        <button onClick={() => handleDeleteProduct(product.Id)}>Delete</button>
                        <input 
                            type="number" 
                            value={product.quantity} 
                            onChange={(e) => handleQuantityChange(product.Id, parseInt(e.target.value, 10))} 
                            min="1"
                        />
                    </li>
                ))}
            </ul>
            <button onClick={() => navigate('/checkout')}>Proceed to Checkout</button>
        </div>
    );
}

