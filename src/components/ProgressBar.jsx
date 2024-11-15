// ProgressBar.js
import React, { useEffect, useState } from "react";
import "../scss/app.scss"; // Adjust the path to your SCSS file

const ProgressBar = ({ isActive }) => {
    const [hidden, setHidden] = useState(false);

    useEffect(() => {
        if (isActive) {
            setHidden(false);
        } else {
            setTimeout(() => setHidden(true), 400); // Match this with your transition duration
        }
    }, [isActive]);

    return (
        <div
            className={`progress-bar ${isActive ? "active" : ""} ${
                hidden ? "hidden" : ""
            }`}
        ></div>
    );
};

export default ProgressBar;
