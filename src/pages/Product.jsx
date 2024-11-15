import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import {
    FaRegStar,
    FaSearchPlus,
    FaStar,
    FaStarHalf,
    FaStarHalfAlt,
} from "react-icons/fa";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import RelatedProducts from "../components/RelatedProducts";

// Reviews Stars
const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
        <div className="flex">
            {/* Full Stars */}
            {[...Array(fullStars)].map((_, i) => (
                <FaStar key={i} className="text-[#FF532E] text-sm xl:text-md 2xl:text-lg" />
            ))}

            {/* Half Star */}
            {halfStar ? (
                <FaStarHalfAlt className="text-[#FF532E] text-sm xl:text-md 2xl:text-lg" />
            ) : null}

            {/* Empty Stars */}
            {[...Array(emptyStars)].map((_, i) => (
                <FaRegStar
                    key={i + fullStars + 1}
                    className="text-[#FF532E] text-sm xl:text-md 2xl:text-lg"
                />
            ))}
        </div>
    );
};

const Product = () => {
    const { productId } = useParams();
    const { products, currency, addToCart } = useContext(ShopContext);
    const [productData, setProductData] = useState(null);
    const [image, setImage] = useState("");
    const [size, setSize] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("description");
    const [visibleReviews, setVisibleReviews] = useState(3);
    const [loadingMoreReviews, setLoadingMoreReviews] = useState(false);
    const [loadingComments, setLoadingComments] = useState(true);

    const fetchProductData = async () => {
        try {
            const product = products.find((item) => item._id === productId);
            if (product) {
                setProductData(product);
                setImage(product.image[0]);
                setCurrentIndex(0);
            } else {
                console.error("Product not found");
                setProductData(null);
            }
            setLoading(false);
            setTimeout(() => {
                setLoadingComments(false);
            }, 1500);
        } catch (error) {
            console.error("Error fetching product data:", error);
            setProductData(null);
            setLoading(false);
        }
    };

    const onLoad = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    useEffect(() => {
        onLoad();
    }, []);

    useEffect(() => {
        setLoading(true);
        setLoadingComments(true);
        setTimeout(() => {
            fetchProductData();
        }, 100);
    }, [productId, products]);

    useEffect(() => {
        if (productData && productData.image) {
            const index = productData.image.indexOf(image);
            setCurrentIndex(index);
        }
    }, [image, productData]);

    const handlePrevImage = () => {
        if (productData && currentIndex > 0) {
            const newIndex = currentIndex - 1;
            setImage(productData.image[newIndex]);
            setCurrentIndex(newIndex);
        }
    };

    const handleNextImage = () => {
        if (productData && currentIndex < productData.image.length - 1) {
            const newIndex = currentIndex + 1;
            setImage(productData.image[newIndex]);
            setCurrentIndex(newIndex);
        }
    };

    const isPrevDisabled = productData ? currentIndex === 0 : true;
    const isNextDisabled = productData
        ? currentIndex === productData.image.length - 1
        : true;

    const averageRating =
        productData && productData.reviews.length > 0
            ? productData.reviews.reduce(
                  (total, review) => total + review.rating,
                  0
              ) / productData.reviews.length
            : 0;

    const handleShowMore = () => {
        setLoadingMoreReviews(true);
        setTimeout(() => {
            setVisibleReviews((prevVisible) => prevVisible + 3);
            setLoadingMoreReviews(false);
        }, 1000);
    };

    const CommentSkeleton = () => (
        <div className="flex flex-col gap-1 py-4 border-b border-gray-200">
            <div className="flex gap-3 items-center">
                <Skeleton width={80} height={15} />
                <Skeleton width={120} height={15} />
            </div>
            <Skeleton count={1} height={20} />
            <Skeleton width={200} height={15} />
        </div>
    );

    const formatDate = (dateString) => {
        const [month, day, year] = dateString.split("-");
        const date = new Date(year, month - 1, day);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    return loading ? (
        // Skeleton Loader when data is being fetched
        <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 select-none">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                <div className="w-full lg:w-1/2 flex flex-col-reverse gap-3 lg:flex-row">
                    <div className="flex lg:flex-col justify-between w-full lg:w-[18.7%] mb-4 lg:mb-0">
                        <Skeleton height={100} width="100%" count={4} />
                    </div>
                    <div className="w-full lg:w-[80%] rounded-md overflow-hidden relative">
                        <Skeleton height={500} width="100%" />
                    </div>
                </div>
                <div className="w-full lg:w-1/2">
                    <h1 className="font-medium text-xl lg:text-2xl mt-2">
                        <Skeleton width={300} />
                    </h1>
                    <div className="flex items-center gap-1 mt-2">
                        <Skeleton width={100} height={20} />
                    </div>
                    <p className="mt-4 lg:mt-5 text-2xl lg:text-3xl font-medium">
                        <Skeleton width={150} />
                    </p>
                    <p className="mt-4 lg:mt-5 text-gray-500 w-full lg:w-4/5">
                        <Skeleton count={3} />
                    </p>
                    <div className="flex flex-col gap-4 my-6 lg:my-8">
                        <p>
                            <Skeleton width={100} />
                        </p>
                        <div className="flex flex-wrap gap-2">
                            <Skeleton width={60} height={40} />
                            <Skeleton width={60} height={40} />
                            <Skeleton width={60} height={40} />
                            <Skeleton width={60} height={40} />
                        </div>
                    </div>
                    <div>
                        <Skeleton width={150} height={50} />
                    </div>
                </div>
            </div>
        </div>
    ) : productData ? (
        // Actual product data once loaded
        <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100 select-none">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                {/* Images on product layer container */}
                <div className="lg:w-1/2 flex flex-col-reverse gap-3 sm:flex-row">
                    <div className="flex sm:flex-col justify-between w-full h-auto sm:w-1/5 md:w-1/6 lg:w-[18.7%] overflow-x-auto sm:overflow-y-auto sm:overflow-x-hidden">
                        {productData.image.map((item, index) => (
                            <div
                                key={index}
                                className={`border w-1/4 sm:w-full flex-shrink-0 cursor-pointer rounded-md overflow-hidden p-[2px] ${item === image ? "border-black" : "border-white"}`}
                            >
                                <img
                                    src={item}
                                    onClick={() => setImage(item)}
                                    className="rounded-md w-full h-auto"
                                    alt={`Product image ${index + 1}`}
                                    loading="lazy"
                                />
                            </div>
                        ))}
                    </div>
                    <div className="w-full sm:w-4/5 md:w-5/6 rounded-md overflow-hidden relative">
                        <img
                            src={image}
                            className="w-full h-full object-cover rounded-md select-none"
                            alt={productData.name}
                            loading="lazy"
                        />
                        <div className="absolute rounded-full bg-black text-white h-8 w-8 top-2 right-2 flex items-center justify-center cursor-pointer hover:bg-black/80">
                            <FaSearchPlus />
                        </div>
                        <div className="absolute top-1/2 left-1/2 w-full h-20 -translate-x-1/2 -translate-y-1/2 flex items-center justify-between px-2">
                            <div
                                className={`bg-white bg-opacity-60 h-10 w-10 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all duration-200 ease-linear text-md ${isPrevDisabled ? "scale-0 invisible" : "cursor-pointer"}`}
                                onClick={handlePrevImage}
                            >
                                <IoIosArrowBack />
                            </div>
                            <div
                                className={`bg-white bg-opacity-60 h-10 w-10 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all duration-200 ease-linear text-md ${isNextDisabled ? "scale-0 invisible" : "cursor-pointer"}`}
                                onClick={handleNextImage}
                            >
                                <IoIosArrowForward />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full lg:w-1/2">
                    <h1 className="font-medium text-xl xl:text-3xl 2xl:text-4xl">
                        {productData.name}
                    </h1>
                    <div className="flex items-center gap-1 mt-2 xl:mt-4">
                        {renderStars(averageRating)}
                        <span className="text-sm  text-gray-500">
                            ({productData.reviews.length} reviews)
                        </span>
                    </div>
                    <p className="mt-4 text-xl xl:text-4xl 2xl:text-5xl font-medium">
                        {currency}
                        {productData.price}
                    </p>
                    <p className="mt-4 text-gray-500 w-full lg:w-4/5 text-sm xl:text-md 2xl:text-xl">
                        {productData.about}
                    </p>
                    <div className="flex flex-col gap-4 my-5 xl:my-7">
                        <p>Select Size</p>
                        <div className="flex flex-wrap gap-2">
                            {productData.sizes.map((item, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSize(item)}
                                    className={`border-2 py-2 px-4 text-sm sm:text-base md:text-base lg:text-base xl:text-lg 2xl:text-xl bg-gray-100 rounded-md ${item === size ? "border-black hover:border-black" : "border-gray-100 hover:border-gray-200"} transition-all duration-200 ease-out`}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>
                    <button
                        onClick={() => addToCart(productData._id, size)}
                        className="bg-black text-white px-8 py-3 rounded-md hover:bg-black/80 active:bg-black/80 w-full sm:w-auto xl:px-12 xl:py-4 2xl:px-16 2xl:py-5 text-sm xl:text-base 2xl:text-lg"
                    >
                        Add To Cart
                    </button>
                    <hr className="mt-6 w-full" />
                    <div className="text-xs lg:text-sm xl:text-md 2xl:text-lg text-gray-500 mt-4 flex flex-col gap-1">
                        <p>100% Original product.</p>
                        <p>Cash on delivery is available on this product.</p>
                        <p>Easy return and exchange policy within 7 days.</p>
                    </div>
                </div>
            </div>

            {/* Description & Review Section */}
            <div className="mt-12 lg:mt-20">
                <div className="flex">
                    <b
                        className={`border rounded-tl-md px-4 lg:px-5 py-2 lg:py-3 text-sm cursor-pointer transition-colors duration-200 ease-in ${activeTab === "description" ? "font-semibold" : "font-normal"}`}
                        onClick={() => setActiveTab("description")}
                    >
                        Description
                    </b>
                    <b
                        className={`border rounded-tr-md px-4 lg:px-5 py-2 lg:py-3 text-sm cursor-pointer transition-colors duration-200 ease-in ${activeTab === "description" ? "font-normal" : "font-semibold"}`}
                        onClick={() => setActiveTab("reviews")}
                    >
                        Reviews {`(${productData.reviews.length})`}
                    </b>
                </div>
                <div className="flex flex-col gap-4 border px-4 lg:px-6 py-4 lg:py-6 text-sm text-gray-500 rounded-r-md rounded-bl-md">
                    {activeTab === "description" ? (
                        <div>
                            <h1 className="font-medium text-xl lg:text-2xl">
                                Product Description
                            </h1>
                            <p className="pt-3">{productData.description}</p>
                        </div>
                    ) : (
                        <div>
                            <h1 className="font-medium text-xl lg:text-2xl">
                                Customer Reviews
                            </h1>
                            {loadingComments ? (
                                <>
                                    <CommentSkeleton />
                                    <CommentSkeleton />
                                    <CommentSkeleton />
                                </>
                            ) : (
                                productData.reviews
                                    .slice(0, visibleReviews)
                                    .map((review, index) => (
                                        <div
                                            key={index}
                                            className="flex flex-col gap-1 py-4 border-b border-gray-200 transition-opacity duration-500 ease-in-out opacity-100"
                                        >
                                            <div className="flex gap-3 items-center">
                                                {renderStars(review.rating)}
                                                <p className="font-semibold">
                                                    {review.reviewer}
                                                </p>
                                                <p className="text-gray-500">
                                                    ({review.rating})
                                                </p>
                                            </div>
                                            <p className="text-gray-500 my-1 leading-5">
                                                {review.comment}
                                            </p>
                                            <p className="text-gray-400 text-sm mt-1">
                                                Reviewed on{" "}
                                                {formatDate(review.date)}
                                            </p>
                                        </div>
                                    ))
                            )}
                            {loadingMoreReviews && (
                                <>
                                    <CommentSkeleton />
                                    <CommentSkeleton />
                                    <CommentSkeleton />
                                </>
                            )}
                            {visibleReviews < productData.reviews.length && (
                                <button
                                    onClick={handleShowMore}
                                    className="mt-4 bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:text-white hover:bg-gray-600 transition-colors duration-200 ease-in"
                                >
                                    {loadingMoreReviews
                                        ? "Loading..."
                                        : `Show More (${productData.reviews.length - visibleReviews})`}
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
            {/* Related Products */}
            <RelatedProducts
                category={productData.category}
                subCategory={productData.subCategory}
            />
        </div>
    ) : (
        <div className="h-screen w-full flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <img src={assets.product_notFound} alt="" className="h-52" />
                {/* <h1 className="text-3xl text-gray-600">No Product Found</h1> */}
                <Link to="/collection">
                    <button className="py-2 px-8 bg-gray-100 rounded-md hover:bg-gray-200 transition-all duration-300 ease-linear">
                        Expore More
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Product;
