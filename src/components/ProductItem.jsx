import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { useInView } from "react-intersection-observer";
import "react-loading-skeleton/dist/skeleton.css";

const ProductItem = ({ id, image, name, price, isLoading }) => {
    const { currency } = useContext(ShopContext);
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
    const [hasLoaded, setHasLoaded] = useState(false);

    const onLoad = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
    // Lazy load the image only when the item is in view
    const handleImageLoad = () => setHasLoaded(true);

    return (
        <Link className="text-gray-700 cursor-pointer" onClick={onLoad} to={`/product/${id}`}>
            <div ref={ref} className="overflow-hidden rounded">
                {inView && !hasLoaded && isLoading ? (
                    <Skeleton height="100%" style={{ aspectRatio: '1 / 1' }} />
                ) : (
                    image && image.length > 0 ? ( // Check if image array exists and has elements
                        <img
                            className={`${
                                !hasLoaded ? "opacity-0" : "opacity-100"
                            } hover:scale-110 transition-all duration-200 ease-linear w-full h-auto`}
                            src={image[0]}
                            alt={name}
                            onLoad={handleImageLoad}
                        />
                    ) : (
                        <Skeleton height="100%" style={{ aspectRatio: '1 / 1' }} /> // Show skeleton if image is missing
                    )
                )}
            </div>
            <p className="pt-3 pb-1 text-sm">
                {isLoading || !inView ? <Skeleton width="80%" /> : name}
            </p>
            <p className="text-sm font-medium">
                {isLoading || !inView ? <Skeleton width="40%" /> : `${currency} ${price}`}
            </p>
        </Link>
    );
};

export default ProductItem;
