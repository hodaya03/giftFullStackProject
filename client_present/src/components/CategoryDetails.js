import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { UserContext } from './UserContext';
import { GoToServer } from '../fetch';
import '../css/CategoryDetails.css'; // Import the CSS file

export default function CategoryDetails() {
    const { name } = useParams();
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    
    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        fetchProductsForCategory(name);
    }, [name, navigate, user]);

    const fetchProductsForCategory = (categoryName) => {
        const query = `/productsfrom/${categoryName}`;
        GoToServer(query, "GET")
            .then((response) => {
                console.log('Server response:', response);
                setProducts(response); // Assuming response is an object with a 'products' array
            })
            .catch((error) => {
                console.error('Error:', error);
                // Handle error
            });
    };

    const backToCategories = () => {
        navigate(`/home`);
    };

    return (
        <div>
            <h1>{name}</h1>
            {products.length > 0 ? (
                products.map((product) => (
                    <Link key={product.Id} to={`/product/${product.Id}`} className="product-link">
                        <div className="product-container">
                            <h3>{product.Name}</h3>
                            <img src={product.Image} alt={product.Name} />
                            <p>{product.Price} $</p>
                        </div>
                    </Link>
                ))
            ) : (
                <p>No products found for this category.</p>
            )}
            <button className="back-button" onClick={backToCategories}>Back</button>
        </div>
    );
}
