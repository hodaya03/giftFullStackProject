import React from 'react';
import '../css/ProductsToChoose.css'; // Import the CSS file

export default function ProductsToChoose({ availableProducts, selectedProducts, handleProductSelect }) {
    console.log('availableProducts',availableProducts);
    console.log('selectedProducts', selectedProducts);
    console.log('handleProductSelect',handleProductSelect);
    
    return (
        <div>
            <h2>Available Products</h2>
            <ul>
                {availableProducts.map((product, index) => (
                    <li key={index}>
                        {product.Name} - ${product.Price}
                        <img src={product.Image} alt={product.Name} />
                        <button onClick={() => handleProductSelect(product)}>Select</button>
                    </li>
                ))}
            </ul>

            <h2>Selected Products</h2>
            <ul>
                {selectedProducts.map((product, index) => (
                    <li key={index}>
                        {product.Name} - {product.Price}$
                        <br/>Quantity: {product.Amount}
                        <img src={product.Image} alt={product.Name} />
                    </li>
                ))}
            </ul>
        </div>
    );
}
