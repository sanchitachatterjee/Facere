
import React, { createContext, useEffect, useState } from "react";
export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = {};
    for (let i = 0; i < 300 + 1; i++) {
        cart[i] = 0;
    }
    return cart;
};

const ShopContextProvider = (props) => {
    const [all_product, setAll_product] = useState([]);
    const [cartItems, setCartItems] = useState(getDefaultCart());

    useEffect(() => {
        fetch('http://localhost:4000/allproducts')
            .then((resp) => resp.json())
            .then((data) => setAll_product(data));

        if (localStorage.getItem('auth-token')) {
            fetchUpdatedCart();
        }
    }, []);

    const fetchUpdatedCart = () => {
        const token = localStorage.getItem("auth-token");
        
        console.log(" Checking Token:", token);  // Debug log
        
        if (!token) {
            console.error(" No auth-token found in localStorage. User might be logged out.");
            return;
        }
    
        fetch("http://localhost:4000/getcart", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "auth-token": token,  // Send token
                "Content-Type": "application/json",
            },
            body: "",
        })
        .then((resp) => {
            console.log("📡 Response Status:", resp.status); // Debugging line
    
            if (resp.status === 401) {
                throw new Error("Unauthorized access - invalid token.");
            }
    
            return resp.json();
        })
        .then((data) => {
            console.log("🛒 Fetched Cart Data:", data);
            setCartItems(data);
        })
        .catch((error) => console.error("❌ Error fetching cart:", error));
    };
    
    

    const addToCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        if (localStorage.getItem('auth-token')) {
            fetch('http://localhost:4000/addtocart', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ itemId }),
            })
                .then((resp) => resp.json())
                .then((data) => {
                    console.log(data);
                    fetchUpdatedCart();
                });
        }
    };

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        if (localStorage.getItem('auth-token')) {
            fetch('http://localhost:4000/removefromcart', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ itemId }),
            })
                .then((resp) => resp.json())
                .then((data) => {
                    console.log(data);
                    fetchUpdatedCart();
                });
        }
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = all_product.find((product) => product.id === Number(item));
                if (itemInfo) {
                    totalAmount += itemInfo.new_price * cartItems[item];
                }
            }
        }
        return totalAmount;
    };

    const getTotalCartItem = () => {
        let totalItem = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                totalItem += cartItems[item];
            }
        }
        return totalItem;
    };

    const contextValue = { all_product, cartItems, addToCart, removeFromCart, getTotalCartAmount, getTotalCartItem };
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;