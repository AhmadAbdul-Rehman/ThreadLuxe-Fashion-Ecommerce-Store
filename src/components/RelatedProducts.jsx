import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { ProductItem, Title } from "./components.js"

const RelatedProducts = ({ category, subCategory }) => {
    const { products } = useContext(ShopContext);
    const [related, setRelated] = useState([]);

    useEffect(() => {
        if (products.length > 0) {
            let filteredProducts = products.filter((product) => {
                return (
                    product.category === category &&
                    product.subCategory === subCategory
                );
            });
            filteredProducts = filteredProducts.slice(0, 6);
            setRelated(filteredProducts);
        }
    }, [category, subCategory, products]);

    console.log(related);
    return (
        <div className="my-20">
            <div className="text-2xl text-center">
               <Title text1={"RELATED"} text2={"PRODUCTS"} />
            </div>
            <div className="my-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4 gap-y-6">
                {related.map((product) => (
                    <ProductItem
                        key={product._id}
                        id={product._id}
                        image={product.image}
                        name={product.name}
                        price={product.price}
                    />
                ))}
            </div>
        </div>
    );
};

export default RelatedProducts;
