import { createContext, useState, useEffect } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";
export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
    const currency = "$";
    const delivery_fee = 10;
    const [search, setSearch] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [clickDelete, setClickDelete] = useState(false);

    const addToCart = async (itemId, size, showToast = true) => {
        if (!size) {
            toast.error("Please select a size", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                closeButton: false,
            });
            return;
        }

        let cartData = structuredClone(cartItems);

        // Check if adding this item would exceed the limit of 5
        const currentQuantity = cartData[itemId]?.[size] || 0;
        if (currentQuantity >= 5) {
            toast.info("You can only add up to 5 items of the same size", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                closeButton: false,
            });
            return;
        }

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setCartItems(cartData);

        if (showToast) {
            toast.success("Added to cart", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                closeButton: false,
            });
        }
    };

    const removeFromCart = (itemId, size) => {
        let cartData = structuredClone(cartItems);
        if (cartData[itemId] && cartData[itemId][size]) {
            if (cartData[itemId][size] > 1 && !clickDelete) {
                cartData[itemId][size] -= 1;
            } 
            else {
                delete cartData[itemId][size];
                if (Object.keys(cartData[itemId]).length === 0) {
                    delete cartData[itemId];
                }
            }
            setCartItems(cartData);
        }
        setClickDelete(false);  // Reset clickDelete after removal
    };

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            for (const size in cartItems[items]) {
                try {
                    totalCount += cartItems[items][size];
                } catch (error) {
                    console.log(error);
                }
            }
        }
        return totalCount;
    };

    const value = {
        products,
        currency,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        addToCart,
        removeFromCart,
        getCartCount,
        setClickDelete
    };

    return (
        <ShopContext.Provider value={value}>{children}</ShopContext.Provider>
    );
};

export { ShopContextProvider };
