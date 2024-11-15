import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const LatestCollection = () => {
    const { products } = useContext(ShopContext);
    const [latestProducts, setLastesProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLastesProducts(products.slice(0, 10));
            setIsLoading(false);
        }, 2000);
    }, [products]);

    return (
        <div className="my-10">
            <div className="text-center py-8 text-3xl">
                <Title text1={"LATEST"} text2={"COLLECTIONS"} />
                <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
                    Explore our latest trends, thoughtfully selected to elevate
                    your wardrobe. Discover the season’s freshest styles and
                    make a statement with confidence. Embrace new looks that are
                    both stylish and timeless.
                </p>
            </div>

            {/* Rendering Products */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4 gap-y-6">
                {isLoading
                    ? Array(10)
                          .fill(0)
                          .map((_, index) => (
                              <ProductItem key={index} isLoading={true} />
                          ))
                    : latestProducts.map((item, index) => (
                          <ProductItem
                              key={index}
                              id={item._id}
                              image={item.image}
                              name={item.name}
                              price={item.price}
                              isLoading={false}
                          />
                      ))}
            </div>
        </div>
    );
};

export default LatestCollection;
