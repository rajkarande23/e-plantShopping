import React, { useState } from 'react';
import './ProductList.css';
import CartItem from './CartItem';
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "./CartSlice";

function ProductList({ onHomeClick }) {

    const dispatch = useDispatch();
    const CartItems = useSelector(state => state.cart.items);

    const [showCart, setShowCart] = useState(false);
    const [addedToCart, setAddedToCart] = useState({});

    // ✅ Calculate total cart quantity
    const calculateTotalQuantity = () => {
        return CartItems
            ? CartItems.reduce((total, item) => total + item.quantity, 0)
            : 0;
    };

    // ✅ Handle Add to Cart
    const handleAddToCart = (plant) => {
        dispatch(addItem(plant));

        setAddedToCart((prev) => ({
            ...prev,
            [plant.name]: true
        }));
    };

    const plantsArray = [
        {
            category: "Air Purifying Plants",
            plants: [
                { name: "Snake Plant", image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg", cost: "$15" },
                { name: "Spider Plant", image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg", cost: "$12" },
                { name: "Peace Lily", image: "https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lilies-4269365_1280.jpg", cost: "$18" },
                { name: "Boston Fern", image: "https://cdn.pixabay.com/photo/2020/04/30/19/52/boston-fern-5114414_1280.jpg", cost: "$20" },
                { name: "Rubber Plant", image: "https://cdn.pixabay.com/photo/2020/02/15/11/49/flower-4850729_1280.jpg", cost: "$17" },
                { name: "Aloe Vera", image: "https://cdn.pixabay.com/photo/2018/04/02/07/42/leaf-3283175_1280.jpg", cost: "$14" }
            ]
        },
        {
            category: "Aromatic Plants",
            plants: [
                { name: "Lavender", image: "https://images.unsplash.com/photo-1611909023032-2d6b3134ecba", cost: "$20" },
                { name: "Jasmine", image: "https://images.unsplash.com/photo-1592729645009-b96d1e63d14b", cost: "$18" },
                { name: "Rosemary", image: "https://cdn.pixabay.com/photo/2019/10/11/07/12/rosemary-4541241_1280.jpg", cost: "$15" },
                { name: "Mint", image: "https://cdn.pixabay.com/photo/2016/01/07/18/16/mint-1126282_1280.jpg", cost: "$12" },
                { name: "Lemon Balm", image: "https://cdn.pixabay.com/photo/2019/09/16/07/41/balm-4480134_1280.jpg", cost: "$14" },
                { name: "Hyacinth", image: "https://cdn.pixabay.com/photo/2019/04/07/20/20/hyacinth-4110726_1280.jpg", cost: "$22" }
            ]
        },
        {
            category: "Medicinal Plants",
            plants: [
                { name: "Aloe Vera", image: "https://cdn.pixabay.com/photo/2018/04/02/07/42/leaf-3283175_1280.jpg", cost: "$14" },
                { name: "Echinacea", image: "https://cdn.pixabay.com/photo/2014/12/05/03/53/echinacea-557477_1280.jpg", cost: "$16" },
                { name: "Peppermint", image: "https://cdn.pixabay.com/photo/2017/07/12/12/23/peppermint-2496773_1280.jpg", cost: "$13" },
                { name: "Chamomile", image: "https://cdn.pixabay.com/photo/2016/08/19/19/48/flowers-1606041_1280.jpg", cost: "$15" },
                { name: "Calendula", image: "https://cdn.pixabay.com/photo/2019/07/15/18/28/flowers-4340127_1280.jpg", cost: "$12" },
                { name: "Lemon Balm", image: "https://cdn.pixabay.com/photo/2019/09/16/07/41/balm-4480134_1280.jpg", cost: "$14" }
            ]
        }
    ];

    return (
        <div>

            {/* ✅ NAVBAR */}
            <div style={{
                backgroundColor: '#4CAF50',
                color: 'white',
                padding: '15px',
                display: 'flex',
                justifyContent: 'space-between'
            }}>

                <h2 onClick={onHomeClick} style={{ cursor: "pointer" }}>
                    Paradise Nursery
                </h2>

                <div style={{ display: "flex", gap: "20px" }}>
                    <span style={{ cursor: "pointer" }}>Plants</span>

                    {/* ✅ CART ICON WITH COUNT */}
                    <span onClick={() => setShowCart(true)} style={{ cursor: "pointer" }}>
                        🛒 {calculateTotalQuantity()}
                    </span>
                </div>
            </div>

            {/* ✅ SHOW CART */}
            {showCart ? (
                <CartItem onContinueShopping={() => setShowCart(false)} />
            ) : (

                <div className="product-grid">

                    {plantsArray.map((category, index) => (
                        <div key={index}>

                            <h2>{category.category}</h2>

                            <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>

                                {category.plants.map((plant, idx) => (
                                    <div key={idx} style={{
                                        border: "1px solid #ccc",
                                        padding: "10px",
                                        width: "200px"
                                    }}>

                                        <img src={plant.image} alt={plant.name} style={{ width: "100%" }} />

                                        <h3>{plant.name}</h3>
                                        <p>{plant.cost}</p>

                                        {/* ✅ DISABLE AFTER ADD */}
                                        <button
                                            onClick={() => handleAddToCart(plant)}
                                            disabled={addedToCart[plant.name]}
                                        >
                                            {addedToCart[plant.name] ? "Added" : "Add to Cart"}
                                        </button>

                                    </div>
                                ))}

                            </div>
                        </div>
                    ))}

                </div>
            )}
        </div>
    );
}

export default ProductList;
