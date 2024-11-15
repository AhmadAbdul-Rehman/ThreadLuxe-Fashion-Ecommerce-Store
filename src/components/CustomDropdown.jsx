import { useState, useRef, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";

const CustomDropdown = ({ options, selectedOption, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentSelection, setCurrentSelection] = useState(selectedOption);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleOptionClick = (option) => {
        setCurrentSelection(option);
        setIsOpen(false);
        if (onSelect) {
            onSelect(option);
        }
    };

    return (
        <div className="relative inline-block w-48" ref={dropdownRef}>
            <div
                className="border border-gray-300 text-sm px-4 py-3 cursor-pointer flex items-center select-none justify-between bg-white text-gray-700 rounded shadow-sm"
                onClick={() => setIsOpen(!isOpen)}
            >
                {currentSelection.label}
                <IoIosArrowDown
                    className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
                />
            </div>
            {isOpen && (
                <div className="absolute w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                    {options.map((option) => (
                        <div
                            key={option.value}
                            className={`px-4 py-2 cursor-pointer hover:bg-gray-100 text-sm select-none ${option.value === currentSelection.value ? "bg-gray-200 hover:bg-gray-200" : ""}`}
                            onClick={() => handleOptionClick(option)}
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CustomDropdown;
