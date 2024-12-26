import React, { useState, useEffect } from 'react';
import "../styles.css";

import Base from './Base';
import Card from './Card';
import { getProducts } from './helper/coreapicalls';

export default function Home() {

    const [products, setProducts] = useState([]);
    const [error, setError] = useState(false);

    const loadAllProducts = () => {
        getProducts().then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProducts(data);
            }
        });
    };

    useEffect(() => {
        loadAllProducts();
    }, []);

    return (
        <Base title="Welcome to the T-Shirt Store" description="Discover our exclusive collection of T-Shirts">
            <div className="row text-center">
                <h1 className="text-white my-4">Explore Our T-Shirt Collection</h1>
                {error && <h2 className="text-danger">Failed to load products</h2>}
                <div className="row justify-content-center">
                    {products.length > 0 ? (
                        products.map((product, index) => (
                            <div key={index} className="col-10 col-sm-6 col-md-4 mb-4">
                                <Card product={product} />
                            </div>
                        ))
                    ) : (
                        <h3 className="text-white">Loading products...</h3>
                    )}
                </div>
            </div>
        </Base>
    );
}
