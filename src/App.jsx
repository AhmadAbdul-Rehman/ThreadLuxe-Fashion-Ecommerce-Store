import "./scss/app.scss";
import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import {
    Home,
    Collection,
    About,
    Contact,
    Product,
    Cart,
    Login,
    Orders,
} from "./pages/pages";
import { Navbar, Footer, ProgressBar, SearchBar } from "./components/components.js";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => setIsLoading(false), 500); // Adjust time based on your needs

        return () => clearTimeout(timer);
    }, [location]);

    return (
        <>
            <ProgressBar isActive={isLoading} />
            <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
                <ToastContainer />
                <Navbar />
                <SearchBar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/collection" element={<Collection />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/product/:productId" element={<Product />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/orders" element={<Orders />} />
                </Routes>
                <Footer />
            </div>
        </>
    );
};

export default App;
