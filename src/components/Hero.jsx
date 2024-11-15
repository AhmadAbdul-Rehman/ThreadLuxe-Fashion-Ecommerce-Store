import { assets } from "../assets/assets";
import { useState, useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Hero = () => {
    const [imageLoaded, setImageLoaded] = useState(false);

    useEffect(() => {
        const img = new Image();
        img.src = assets.hero_img;
        setTimeout(() => {
            setImageLoaded(true);
        }, 2000);
    }, []);

    return (
        <div className="flex flex-col sm:flex-row border border-gray-400 rounded-md overflow-hidden h-[80vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh]">
            {/* Hero left side */}
            <div className="w-full sm:w-1/2 h-full flex items-center justify-center">
                <div className="text-[#414141]">
                    <div className="flex items-center gap-2">
                        <p className="w-8 md:w-11 h-[2px] bg-[#414141] "></p>
                        <p className="font-medium text-sm md:text-base">
                            OUR BESTSELLERS
                        </p>
                    </div>
                    <h1 className="text-3xl sm:py-3 lg:text-5xl leading-relaxed prata-regular">
                        Latest Arrivals
                    </h1>
                    <div className="flex items-center gap-2">
                        <p className="font-semibold text-sm md:text-base">
                            SHOP NOW
                        </p>
                        <p className="w-8 md:w-11 h-[1px] bg-[#414141] "></p>
                    </div>
                </div>
            </div>
            {/* Hero right side */}
            <div className="w-full sm:w-1/2 h-full overflow-hidden">
                {!imageLoaded ? (
                    <Skeleton height="99%" width="99%" />
                ) : (
                    <LazyLoadImage
                        src={assets.hero_img}
                        className="h-full w-full object-cover scale-105"
                        alt="Hero"
                    />
                )}
            </div>
        </div>
    );
};

export default Hero;
