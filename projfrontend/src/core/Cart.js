import React, { useState, useEffect } from 'react';
import "../styles.css";

import Base from './Base';
import { loadCart } from './helper/carthelper';
import Card from './Card';
import StripeCheckout from './StripeCheckout';

const Cart = () => {
    const [products, setProducts] = useState([]);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        setProducts(loadCart());
    }, [reload]);

    const loadAllProducts = (products) => {
        return (
            <div>
                <h2 className="text-center text-white">Your Shopping Cart</h2>
                {products.map((product, index) => (
                    <Card
                        key={index}
                        product={product}
                        removefromCart={true}
                        addtoCart={false}
                        setReload={setReload}
                        reload={reload}
                    />
                ))}
            </div>
        );
    };

    return (
        <Base title="Your Cart" description="Review and proceed to checkout">
            <div className="row text-center">
                <div className="col-md-6 mb-4">
                    {products.length > 0 ? (
                        loadAllProducts(products)
                    ) : (
                        <h3 className="text-white">No products in your cart</h3>
                    )}
                </div>
                <div className="col-md-6 mb-4">
                    <h2 className="text-white">Checkout</h2>
                    <StripeCheckout
                        products={products}
                        setReload={setReload}
                    />
                </div>
            </div>
        </Base>
    );
};

export default Cart;
