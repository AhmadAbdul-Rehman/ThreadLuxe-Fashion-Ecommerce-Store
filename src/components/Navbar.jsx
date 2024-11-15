import { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { MdCollections } from "react-icons/md";
import { FaRegAddressCard } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { ShopContext } from "../context/ShopContext";
const Navbar = () => {
    const [visible, setVisible] = useState(false);
    const { setShowSearch, getCartCount } = useContext(ShopContext);

    return (
        <div className="flex items-center justify-between py-5 font-medium">
            <Link to="/">
                <img
                    src={assets.logo}
                    className="w-28 sm:w-36 cursor-pointer"
                    alt="Forever"
                />
            </Link>
            <ul className="hidden sm:flex gap-5 text-sm text-gray-500">
                <NavLink
                    to="/"
                    onClick={() => setShowSearch(false)}
                    className="flex flex-col items-center gap-1 hover:text-black transition-colors duration-300 ease-linear"
                >
                    <p>HOME</p>
                    <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden transition-all duration-300 " />
                </NavLink>
                <NavLink
                    to="/collection"
                    onClick={() => setShowSearch(false)}
                    className="flex flex-col items-center gap-1 hover:text-black transition-colors duration-300 ease-linear"
                >
                    <p>COLLECTION</p>
                    <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden transition-all duration-300 " />
                </NavLink>
                <NavLink
                    to="/about"
                    onClick={() => setShowSearch(false)}
                    className="flex flex-col items-center gap-1 hover:text-black transition-colors duration-300 ease-linear"
                >
                    <p>ABOUT</p>
                    <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden transition-all duration-300 " />
                </NavLink>
                <NavLink
                    to="/contact"
                    onClick={() => setShowSearch(false)}
                    className="flex flex-col items-center gap-1 hover:text-black transition-colors duration-300 ease-linear"
                >
                    <p>CONTACT</p>
                    <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden transition-all duration-300 " />
                </NavLink>
            </ul>
            <div className="flex items-center gap-6">
                <Link to="/collection">
                    <img
                        src={assets.search_icon}
                        className="w-5 cursor-pointer"
                        alt="Search"
                        onClick={() => setShowSearch(true)}
                    />
                </Link>

                <div className="group relative">
                    <img
                        src={assets.profile_icon}
                        className="w-5 cursor-pointer"
                        alt="profile"
                    />

                    <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
                        <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-700 rounded">
                            <p className="cursor-pointer hover:text-black transition-colors duration-200">
                                My Profile
                            </p>
                            <p className="cursor-pointer hover:text-black transition-colors duration-200">
                                Orders
                            </p>
                            <p className="cursor-pointer hover:text-black transition-colors duration-200">
                                Logout
                            </p>
                        </div>
                    </div>
                </div>
                <Link to="/cart" className="relative">
                    <img
                        src={assets.cart_icon}
                        className="w-5 min-w-5"
                        alt=""
                    />
                    <p className="absolute right-[-5px] bottom-[-5px] w-4 leading-4 text-center text-[8px] bg-black text-white aspect-square rounded-full ">
                        {getCartCount()}
                    </p>
                </Link>
                <img
                    onClick={() => setVisible(true)}
                    src={assets.menu_icon}
                    className="w-5 cursor-pointer sm:hidden"
                    alt="menu"
                />
            </div>
            {/* Sidebar menu for small screens */}
            <div
                className={`sm:hidden fixed inset-0 overflow-hidden bg-white transition-all duration-300 ease-in-out ${visible ? "w-full" : "w-0"} z-20`}
            >
                <div className="flex flex-col  text-gray-600">
                    <div
                        onClick={() => setVisible(false)}
                        className="flex items-center gap-4 p-3 cursor-pointer my-3 "
                    >
                        <img
                            src={assets.dropdown_icon}
                            className="h-4 rotate-180"
                            alt="back"
                        />
                        <p>Back</p>
                    </div>
                    <NavLink
                        onClick={() => {
                            setVisible(false);
                            setShowSearch(false);
                        }}
                        className="py-[3vh] pl-6 border hover:bg-black hover:text-white transition-all duration-200 ease-linear flex items-center gap-2 mx-5 my-1 rounded-xl"
                        to="/"
                    >
                        {" "}
                        <AiOutlineHome className="text-2xl" /> HOME
                    </NavLink>
                    <NavLink
                        onClick={() => {
                            setVisible(false);
                            setShowSearch(false);
                        }}
                        className="py-[3vh] pl-6 border hover:bg-black hover:text-white transition-all duration-200 ease-linear flex items-center gap-2 mx-5 my-1 rounded-xl"
                        to="/collection"
                    >
                        {" "}
                        <MdCollections className="text-2xl" /> COLLECTION
                    </NavLink>
                    <NavLink
                        onClick={() => {
                            setVisible(false);
                            setShowSearch(false);
                        }}
                        className="py-[3vh] pl-6 border hover:bg-black hover:text-white transition-all duration-200 ease-linear flex items-center gap-2 mx-5 my-1 rounded-xl"
                        to="/about"
                    >
                        {" "}
                        <FaRegAddressCard className="text-2xl" /> ABOUT
                    </NavLink>
                    <NavLink
                        onClick={() => {
                            setVisible(false);
                            setShowSearch(false);
                        }}
                        className="py-[3vh] pl-6 border hover:bg-black hover:text-white transition-all duration-200 ease-linear flex items-center gap-2 mx-5 my-1 rounded-xl"
                        to="/contact"
                    >
                        <FiMail className="text-2xl" /> CONTACT
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
