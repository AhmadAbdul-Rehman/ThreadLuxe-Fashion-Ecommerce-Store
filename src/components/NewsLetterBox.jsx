import { assets } from "../assets/assets";

const NewsLetterBox = () => {
    const onSubmitHandler = (event) => {
        event.preventDefault();
    }
    return (
        <div className="text-center">
            <p className="text-2xl font-medium text-gray-800">
                Subscribe now & get 20% off
            </p>
            <p className="text-gray-400 mt-3">
                Join our newsletter to receive exclusive deals, product updates,
                and more! Don't miss out on this limited-time offer.
            </p>
            <form onSubmit={onSubmitHandler} className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3 rounded-md overflow-hidden">
                <input type="email" className="w-full sm:flex-1 outline-none text-gray-600" name="getSubscribtion" id="subscription" placeholder="Enter your email" />
                <button className="bg-black text-white text-sm px-10 py-4 hover:bg-gray-800 transition duration-5 ease-linear rounded-md">SUBSCRIBE</button>
            </form>
        </div>
    );
};

export default NewsLetterBox;
