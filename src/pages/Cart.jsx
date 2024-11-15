import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { AiOutlineDelete, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Cart = () => {
    const {
        products,
        currency,
        cartItems,
        addToCart,
        removeFromCart,
        setClickDelete,
    } = useContext(ShopContext);
    const [cartData, setCartData] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [popupData, setPopupData] = useState({ itemId: null, size: null });

    useEffect(() => {
        const tempData = [];
        for (const itemId in cartItems) {
            for (const size in cartItems[itemId]) {
                if (cartItems[itemId][size] > 0) {
                    tempData.push({
                        _id: itemId,
                        size: size,
                        quantity: cartItems[itemId][size],
                    });
                }
            }
        }
        setCartData(tempData);
    }, [cartItems]);

    const handleQuantityChange = (itemId, size, change) => {
        if (change > 0) {
            const currentQuantity = cartItems[itemId]?.[size] || 0;
            if (currentQuantity < 5) {
                addToCart(itemId, size, false); // Pass false to prevent toast
            } else {
                toast.info("You can only add up to 5 items", {
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
        } else {
            const currentQuantity = cartItems[itemId]?.[size] || 0;
            if (currentQuantity === 1) {
                setPopupData({ itemId, size });
                setShowPopup(true);
            } else {
                removeFromCart(itemId, size);
            }
        }
    };

    const handleConfirmRemove = () => {
        removeFromCart(popupData.itemId, popupData.size);
        setShowPopup(false);
    };

    const handleDelete = (itemId, size) => {
        setPopupData({ itemId, size });
        setClickDelete(true);
        setShowPopup(true);
    };

    return cartData.length > 0 ? (
        <div className="border-t pt-14 relative">
            <div className="text-2xl mb-3">
                <Title text1={"YOUR"} text2={"CART"} />
            </div>

            <div>
                <div className="hidden sm:grid py-4 border-b text-sm text-gray-500 font-mono font-normal grid-cols-[4fr_2fr_0.5fr] items-center gap-4">
                    <div>Product</div>
                    <div>Quantity</div>
                    <div>Total Price</div>
                </div>
                {cartData.map((item, index) => {
                    const productData = products.find(
                        (product) => product._id === item._id
                    );

                    return (
                        <div
                            key={index}
                            className="py-4 border-t border-b text-gray-700 sm:grid sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
                        >
                            <div className="flex sm:flex-row items-start gap-6 mb-4 sm:mb-0">
                                <div className="w-20 overflow-hidden rounded-md">
                                    <img
                                        src={productData.image[0]}
                                        alt=""
                                        className="w-full object-cover hover:scale-105 transition-all duration-300"
                                    />
                                </div>
                                <div>
                                    <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-medium truncate">
                                        {productData.name}
                                    </p>
                                    <div className="flex items-center gap-5 mt-2">
                                        <p className="text-base size-8 bg-gray-100 rounded-md flex items-center justify-center select-none hover:bg-gray-200">
                                            {item.size}
                                        </p>
                                        <p className="text-base">
                                            {currency}
                                            {productData.price}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-between sm:justify-start mb-4 sm:mb-0">
                                <div className="border rounded-md flex items-center">
                                    <button
                                        onClick={() =>
                                            handleQuantityChange(
                                                item._id,
                                                item.size,
                                                -1
                                            )
                                        }
                                        className="p-2 hover:bg-gray-100"
                                    >
                                        <AiOutlineMinus />
                                    </button>
                                    <span className="px-2">
                                        {item.quantity}
                                    </span>
                                    <button
                                        onClick={() =>
                                            handleQuantityChange(
                                                item._id,
                                                item.size,
                                                1
                                            )
                                        }
                                        className="p-2 hover:bg-gray-100"
                                    >
                                        <AiOutlinePlus />
                                    </button>
                                </div>
                                <button
                                    onClick={() =>
                                        handleDelete(item._id, item.size)
                                    }
                                    className="size-8 rounded-md flex items-center justify-center bg-gray-100 hover:bg-gray-200 ml-2 transition-all duration-300"
                                >
                                    <AiOutlineDelete />
                                </button>
                            </div>
                            <div className="flex items-center justify-between sm:justify-start">
                                <div className="sm:hidden">Total:</div>
                                <div>
                                    {currency}
                                    {productData.price * item.quantity}
                                </div>
                                {/* <button
                                    onClick={() =>
                                        handleDelete(item._id, item.size)
                                    }
                                    className="size-8 rounded-md items-center justify-center bg-gray-100 hover:bg-gray-200 ml-2 transition-all duration-300 sm:hidden flex"
                                >
                                    <AiOutlineDelete />
                                </button> */}
                            </div>
                        </div>
                    );
                })}
            </div>

            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                    <div className="bg-white p-6 rounded-lg shadow-lg z-10 max-w-md w-full">
                        <h2 className="text-xl font-bold mb-4">
                            Confirm Removal
                        </h2>
                        <p className="mb-6">
                            Are you sure you want to remove this item from your
                            cart?
                        </p>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={() => setShowPopup(false)}
                                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 select-none"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmRemove}
                                className="px-4 py-2 bg-black text-white rounded hover:bg-black/80 select-none"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    ) : (
        <div className="flex items-center flex-col py-10 selection:bg-black selection:text-white">
            {/* cart image  using tailwind css */}
            <div className="bg-cart-image bg-cover bg-center bg-no-repeat h-24 w-20"></div>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold mb-2 sm:mb-3 md:mb-4 text-center">
                Your cart is empty
            </h2>
            <p className="text-gray-600 mb-6 text-center">
                Add some items to your cart to get started!
            </p>
            <Link to="/collection">
                <button className="bg-black text-white px-4 py-2 rounded-md hover:bg-black/80 select-none">
                    Continue Shopping
                </button>
            </Link>
        </div>
    );
};

export default Cart;
