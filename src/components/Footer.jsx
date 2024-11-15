import { assets } from "../assets/assets";
import { IoIosArrowUp } from "react-icons/io";

const Footer = () => {
    const goTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
    return (
        <div>
            <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm ">
                {/* Footer - Footer Content */}
                <div>
                    <img src={assets.logo} className="mb-5 w-32" alt="" />
                    <p className="w-full md:w-2/3 text-gray-600 mb-6">
                        At [ Usman Store ], we are committed to providing an
                        exceptional shopping experience with a focus on quality
                        and customer satisfaction. Thank you for choosing us as
                        your trusted destination. Shop with confidence and
                        discover the best we have to offer!
                    </p>
                </div>
                {/* Footer - About Company */}
                <div>
                    <p className="text-xl font-medium mb-5">COMPANY</p>
                    <ul className="flex flex-col gap-1 text-gray-600">
                        <li className="hover:text-black cursor-pointer transition-colors duration-200 ease-linear">
                            Home
                        </li>
                        <li className="hover:text-black cursor-pointer transition-colors duration-200 ease-linear">
                            About
                        </li>
                        <li className="hover:text-black cursor-pointer transition-colors duration-200 ease-linear">
                            Delivery
                        </li>
                        <li className="hover:text-black cursor-pointer transition-colors duration-200 ease-linear">
                            Privacy Policy
                        </li>
                    </ul>
                </div>
                {/* Footer - Get in Touch */}
                <div className="flex flex-row gap-2 md:gap-5 items-center sm:items-start justify-between">
                    <div>
                        <p className="text-xl font-medium mb-5">
                            Get in thouch
                        </p>
                        <ul className="flex flex-col gap-1 text-gray-600">
                            <li className="hover:text-black cursor-pointer transition-colors duration-200 ease-linear">
                                +92-309-922-2611
                            </li>
                            <li className="hover:text-black cursor-pointer transition-colors duration-200 ease-linear">
                                usmanghanibwp33@gmail.com
                            </li>
                        </ul>
                    </div>
                    <div
                        onClick={goTop}
                        className="h-10 w-10 rounded-full bg-black  flex items-center justify-center cursor-pointer self-end hover:bg-gray-700 transition duration-300 ease-in"
                    >
                        <IoIosArrowUp className="text-white" />
                    </div>
                </div>
            </div>
            <div>
                <hr />
                <p className="py-5 text-sm text-center">
                    © 2042@, UsmanStore.com - All rights reserved.
                </p>
            </div>
        </div>
    );
};

export default Footer;
