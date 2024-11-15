import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { ShopContextProvider as Context } from "./context/ShopContext.jsx";
import "./scss/app.scss";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
    <Router>
        <Context>
            <App />
        </Context>
    </Router>
);
