import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from './UserContext';
import { Link, useNavigate } from 'react-router-dom';
import Category from './Category';
import { GoToServer, GoToServer1 } from '../fetch';
import '../css/Home.css'

export default function Home() {
    const { user } = useContext(UserContext);
    const [categories, setCategories] = useState([]);
    const [displayedCategories, setDisplayedCategories] = useState([]);
    const [showMore, setShowMore] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if(user) {
            console.log("user.Mail", user.Mail)
        }
        fetchCategories();
    }, []);

    const fetchCategories = () => {
        const query = `/home/`;
        GoToServer(query, "GET")
            .then((response) => {
                setCategories(response);
                setDisplayedCategories(response.slice(0, 5));
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const handleCategoryClick = (category) => {
        if (!user) {
            navigate('/login');
        } else {
            navigate(`/category/${category}`);
        }
    };

    const handleShowMore = () => {
        setShowMore(true);
        setDisplayedCategories(categories);
    };

    const goToBuyGift = () => {
        if (!user) {
            navigate('/login');
        } else {
            navigate(`/home/buyGift`);
        }
        
    };

    return (
        <div>
            <div className="header">
                <h1>Home</h1>
                <div className="user-info">
                    {user ? (
                        <span>Welcome, {user.Mail}</span>
                    ) : (
                        <Link to="/login">Login</Link>
                    )}
                </div>
            </div>
            <h2>CATEGORIES</h2>
            <div className="categories">
                {categories.map((category) => (
                    <Category key={category.Id} name={category.Name} onClick={() => handleCategoryClick(category.Name)} />
                ))}
                {!showMore && categories.length > 5 && (
                    <button className="show-more-button" onClick={handleShowMore}>Show More</button>
                )}
            </div>

            {selectedCategory && (
                <div className="products">
                    <h2>Products in {selectedCategory}</h2>
                    {products.map((product) => (
                        <div key={product.Id} className="product">
                            <h3>{product.Name}</h3>
                            <img src={product.Image} alt={product.Name} />
                            <p>{product.Price} $</p>
                        </div>
                    ))}
                </div>
            )}

            <div className="gift-section">
                <h5>To Buy a gift</h5>
                <button onClick={goToBuyGift}>Buy a gift</button>
            </div>
        </div>
    );
}
