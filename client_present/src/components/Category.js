import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Category.css'; // Import the CSS file

export default function Category({ name, onClick }) {
    const navigate = useNavigate();

    return (
        <div className="category" onClick={onClick}>
            <h2>{name}</h2>
        </div>
    );
}

