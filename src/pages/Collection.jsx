import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import { ProductItem, Title } from "../components/components";
import CustomDropdown from "../components/CustomDropdown";
import Fuse from "fuse.js"; // Import Fuse.js

const Collection = () => {
    const { products, search, showSearch } = useContext(ShopContext);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [displayedProducts, setDisplayedProducts] = useState([]);
    const [showFilter, setShowFilter] = useState(false);
    const [selectedSort, setSelectedSort] = useState("relevant");
    const [isLoading, setIsLoading] = useState(true); // Initial loading state
    const [isLoadingMore, setIsLoadingMore] = useState(false); // Loading state for "Show More"
    const [itemsToShow, setItemsToShow] = useState(10); // Items to show initially
    const [category, setCategory] = useState([]);
    const [subCategory, setSubCategory] = useState([]);

    // Configure Fuse.js for searching across multiple fields (name and category)
    const fuse = new Fuse(products, {
        keys: ["name", "category"], // Specify fields for searching
        threshold: 0.3, // Adjust the threshold for fuzzy matching
    });

    // Function to toggle selected categories
    const toggleCategory = (event) => {
        const value = event.target.value;
        setCategory((prev) =>
            prev.includes(value)
                ? prev.filter((item) => item !== value)
                : [...prev, value]
        );
    };

    // Function to toggle selected subcategories
    const toggleSubCategory = (event) => {
        const value = event.target.value;
        setSubCategory((prev) =>
            prev.includes(value)
                ? prev.filter((item) => item !== value)
                : [...prev, value]
        );
    };

    // Function to sort products based on the selected sort option
    const sortProducts = (productsToSort) => {
        const sortedProducts = [...productsToSort];
        if (selectedSort === "low-high") {
            sortedProducts.sort((a, b) => a.price - b.price);
        } else if (selectedSort === "high-low") {
            sortedProducts.sort((a, b) => b.price - a.price);
        }
        return sortedProducts;
    };

    // Function to filter and sort products based on selected categories and subcategories
    const applyFilters = () => {
        let productCopy = [...products];

        if (showSearch && search) {
            // Use Fuse.js for searching across both name and category
            const fuseResults = fuse.search(search);
            productCopy = fuseResults.map((result) => result.item); // Extract items from Fuse.js results
        }

        if (category.length > 0) {
            productCopy = productCopy.filter((item) =>
                category.includes(item.category)
            );
        }

        if (subCategory.length > 0) {
            productCopy = productCopy.filter((item) =>
                subCategory.includes(item.subCategory)
            );
        }

        const sortedProducts = sortProducts(productCopy);

        setFilteredProducts(sortedProducts);
        setDisplayedProducts(sortedProducts.slice(0, itemsToShow));
    };

    useEffect(() => {
        setIsLoading(true);
        setTimeout(() => {
            applyFilters();
            setIsLoading(false);
        }, 500);
    }, [
        category,
        subCategory,
        itemsToShow,
        products,
        selectedSort,
        search,
        showSearch,
    ]);

    

    // Handle option selection for sorting
    const handleSortSelect = (option) => {
        setSelectedSort(option.value);
    };

    const sortOptions = [
        { value: "relevant", label: "Sort by: Relevant" },
        { value: "low-high", label: "Sort by: Low to High" },
        { value: "high-low", label: "Sort by: High to Low" },
    ];

    // Handle Show More button click
    const handleShowMore = () => {
        setIsLoadingMore(true);
        setTimeout(() => {
            const moreProducts = filteredProducts.slice(
                displayedProducts.length,
                displayedProducts.length + 10
            );
            setDisplayedProducts((prev) => [...prev, ...moreProducts]);
            setItemsToShow((prev) => prev + 10);
            setIsLoadingMore(false);
        }, 1000); // Simulating load time for more products
    };

    return (
        <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
            {/* Filter Options */}
            <div className="min-w-60">
                <p
                    onClick={() => setShowFilter(!showFilter)}
                    className="my-2 text-xl flex items-center cursor-pointer gap-2 select-none"
                >
                    FILTERS
                    <img
                        src={assets.dropdown_icon}
                        className={`h-3 sm:hidden ${
                            showFilter ? "rotate-90" : ""
                        }`}
                        alt=""
                    />
                </p>
                {/* Category Filter */}
                <div
                    className={`border border-gray-300 pl-5 py-3 mt-6 rounded ${
                        showFilter ? "" : "hidden"
                    } sm:block`}
                >
                    <p className="mb-3 text-sm font-medium">CATEGORIES</p>
                    <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
                        <p className="flex gap-2 ">
                            <input
                                type="checkbox"
                                className="w-3 accent-black"
                                id="Men"
                                value={"Men"}
                                onChange={toggleCategory}
                            />{" "}
                            <label
                                htmlFor="Men"
                                className="cursor-pointer select-none"
                            >
                                Men
                            </label>
                        </p>
                        <p className="flex gap-2 ">
                            <input
                                type="checkbox"
                                className="w-3 accent-black"
                                id="Women"
                                value={"Women"}
                                onChange={toggleCategory}
                            />{" "}
                            <label
                                htmlFor="Women"
                                className="cursor-pointer select-none"
                            >
                                Women
                            </label>
                        </p>
                        <p className="flex gap-2 ">
                            <input
                                type="checkbox"
                                className="w-3 accent-black"
                                id="Kids"
                                value={"Kids"}
                                onChange={toggleCategory}
                            />{" "}
                            <label
                                htmlFor="Kids"
                                className="cursor-pointer select-none"
                            >
                                Kids
                            </label>
                        </p>
                        {/* Additional category filters */}
                    </div>
                </div>
                {/* SubCategory Filter */}
                <div
                    className={`border border-gray-300 pl-5 py-3 my-5 rounded ${
                        showFilter ? "" : "hidden"
                    } sm:block`}
                >
                    <p className="mb-3 text-sm font-medium">TYPE</p>
                    <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
                        <p className="flex gap-2 ">
                            <input
                                type="checkbox"
                                className="w-3 accent-black"
                                id="Topwear"
                                value={"Topwear"}
                                onChange={toggleSubCategory}
                            />{" "}
                            <label
                                htmlFor="Topwear"
                                className="cursor-pointer select-none"
                            >
                                Topwear
                            </label>
                        </p>
                        <p className="flex gap-2 ">
                            <input
                                type="checkbox"
                                className="w-3 accent-black"
                                id="Bottomwear"
                                value={"Bottomwear"}
                                onChange={toggleSubCategory}
                            />{" "}
                            <label
                                htmlFor="Bottomwear"
                                className="cursor-pointer select-none"
                            >
                                Bottomwear
                            </label>
                        </p>
                        <p className="flex gap-2 ">
                            <input
                                type="checkbox"
                                className="w-3 accent-black"
                                id="Winterwear"
                                value={"Winterwear"}
                                onChange={toggleSubCategory}
                            />{" "}
                            <label
                                htmlFor="Winterwear"
                                className="cursor-pointer select-none"
                            >
                                Winterwear
                            </label>
                        </p>
                        {/* Additional subcategory filters */}
                    </div>
                </div>
            </div>
            {/* Collection Products */}
            <div className="flex-1">
                <div className="flex justify-between items-center text-base sm:text-2xl mb-4">
                    <Title text1={"ALL"} text2={"COLLECTION"} />
                    {/* Product Sort */}
                    <CustomDropdown
                        options={sortOptions}
                        selectedOption={sortOptions.find(
                            (option) => option.value === selectedSort
                        )}
                        onSelect={handleSortSelect}
                    />
                </div>

                {/* Product listing */}
                {(isLoading || isLoadingMore) &&
                displayedProducts.length === 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 gap-y-6">
                        {Array(itemsToShow)
                            .fill(0)
                            .map((_, index) => (
                                <ProductItem
                                    key={`skeleton-${index}`}
                                    isLoading={true}
                                />
                            ))}
                    </div>
                ) : filteredProducts.length === 0 ? (
                    <div className="text-center text-3xl font-medium text-gray-500 h-full w-full flex items-center justify-center">
                        Products Not Found
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 gap-y-6">
                        {displayedProducts.map((item, index) => (
                            <ProductItem
                                key={index}
                                id={item._id}
                                image={item.image}
                                name={item.name}
                                price={item.price}
                                isLoading={false}
                            />
                        ))}
                        {isLoadingMore &&
                            Array(10)
                                .fill(0)
                                .map((_, index) => (
                                    <ProductItem
                                        key={`skeleton-more-${index}`}
                                        isLoading={true}
                                    />
                                ))}
                    </div>
                )}

                {/* Show More Button */}
                {filteredProducts.length > displayedProducts.length && (
                    <div className="flex justify-center mt-6">
                        <button
                            onClick={handleShowMore}
                            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-700"
                            disabled={isLoadingMore}
                        >
                            {isLoadingMore ? "Loading..." : "Show More"}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Collection;
