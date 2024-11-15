import BestSeller from "../components/BestSeller";
import Hero from "../components/Hero";
import LatestCollection from "../components/LatestCollection";
import NewsLetterBox from "../components/NewsLetterBox";
import OurPolicy from "../components/OurPolicy";

const Home = () => {
    return (
        <div>
            {/* Hero Section Component */}
            <Hero />
            {/* Lastest Collection Component */}
            <LatestCollection />
            {/* Best Seller Component */}
            <BestSeller />
            {/* Our Polices Section */}
            <OurPolicy />
            {/* News Letter Box section */}
            <NewsLetterBox />
        </div>
    );
};

export default Home;



