import { useEffect, useState } from "react";
import { AiOutlineCheck, AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from '../assets/logo.png'

const StepForm = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
    });

    const [location, setLocation] = useState({
        country: "",
        city: "",
        zipCode: "",
        region: ""
    });


    // Load the current step from localStorage on component mount
    useEffect(() => {
        const savedStep = localStorage.getItem("currentStep");
        if (savedStep) {
            setCurrentStep(parseInt(savedStep));
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name in formData) {
            setFormData({ ...formData, [name]: value });
        } else {
            setLocation({ ...location, [name]: value });
        }
    };

    const handleNext = () => {
        if (
            (currentStep === 1 &&
                formData.firstName &&
                formData.lastName &&
                formData.email &&
                formData.phone) ||
            (currentStep === 2 &&
                location.country &&
                location.city &&
                location.zipCode &&
                location.region) ||
            currentStep === 3
        ) {
            const nextStep = currentStep + 1;
            setCurrentStep(nextStep);
            localStorage.setItem("currentStep", nextStep); // Save current step to localStorage
        } else {
            toast.error("Please fill all required fields.");
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            const prevStep = currentStep - 1;
            setCurrentStep(prevStep);
            localStorage.setItem("currentStep", prevStep); // Save current step to localStorage
        }
    };

    const handleLocationSelect = () => {
        console.log("Set Location clicked");
    };
    const handleUseCurrentLocation = () => {
        console.log("Use Current Location clicked");
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-6">
            <img src={logo} alt="" className="py-5 h-16 w-16" />
            <ToastContainer />
            <div className="w-full max-w-lg bg-white p-6 rounded shadow-lg">
                {/* Step Progress */}
                <div className="flex flex-col items-center mb-6">
                    {/* Steps Text */}
                    <div className="flex justify-between w-full text-gray-600 text-sm font-semibold mb-2">
                        <span className={`${currentStep >= 1 ? "text-green-500" : ""}`}>Step 1</span>
                        <span className={`${currentStep >= 2 ? "text-green-500" : ""}`}>Step 2</span>
                        <span className={`${currentStep >= 3 ? "text-green-500" : ""}`}>Step 3</span>
                    </div>
                    {/* Step Circles */}
                    <div className="flex justify-between w-full items-center relative">
                        {["Step 1", "Step 2", "Step 3"].map((_, index) => (
                            <div key={index} className="flex flex-col items-center">
                                <div
                                    className={`w-8 h-8 flex items-center justify-center rounded-full ${index + 1 <= currentStep
                                        ? "bg-green-500 text-white"
                                        : "bg-gray-200 text-gray-400"
                                        }`}
                                >
                                    {index + 1 <= currentStep ? (
                                        <AiOutlineCheck className="font-bold" />
                                    ) : (
                                        index + 1
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Form Content */}
                {currentStep === 1 && (
                    <div>
                        <h2 className="text-xl font-bold mb-4">Personal Information</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <input
                                type="text"
                                name="firstName"
                                placeholder="First Name"
                                value={formData.firstName}
                                onChange={handleChange}
                                className="bg-gray-100  rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-blue-400 "
                                required
                            />
                            <input
                                type="text"
                                name="lastName"
                                placeholder="Last Name"
                                value={formData.lastName}
                                onChange={handleChange}
                                className="bg-gray-100  rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-blue-400 "
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                className="bg-gray-100  rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-blue-400"
                                required
                            />
                            <input
                                type="tel"
                                name="phone"
                                placeholder="Phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="bg-gray-100  rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-blue-400"
                                required
                            />
                        </div>
                        <div className="flex justify-center items-center gap-4 mt-6">
                            {/* Back Button */}
                            <button
                                onClick={handleBack}
                                disabled={currentStep === 1}
                                className={`px-4 py-2 rounded-full border ${currentStep === 1
                                    ? "border-gray-300 text-gray-500 cursor-not-allowed"
                                    : "border-green-500 text-green-500 hover:bg-green-100"
                                    } flex items-center gap-2`}
                            >
                                <AiOutlineArrowLeft /> Back
                            </button>

                            {/* Next Button */}
                            {currentStep <= 3 && (
                                <button
                                    onClick={handleNext}
                                    className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 flex items-center gap-2"
                                >
                                    Next <AiOutlineArrowRight />
                                </button>
                            )}
                        </div>
                    </div>
                )}

                {currentStep === 2 && (
                    <div className="p-6 bg-white max-w-lg mx-auto rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Location</h2>

                        {/* Country and City */}
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div className="relative">
                                <label className="block text-sm font-medium text-gray-600 mb-1">
                                    Country
                                </label>
                                <select
                                    name="country"
                                    value={location.country}
                                    onChange={handleChange}
                                    className="block w-full px-4 py-2 text-gray-700 bg-gray-100  rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
                                >
                                    <option>Select country</option>
                                    <option>Country 1</option>
                                    <option>Country 2</option>
                                </select>
                            </div>

                            <div className="relative">
                                <label className="block text-sm font-medium text-gray-600 mb-1">
                                    City
                                </label>
                                <select
                                    name="city"
                                    value={location.city}
                                    onChange={handleChange}
                                    className="block w-full px-4 py-2 text-gray-700 bg-gray-100 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
                                >
                                    <option>Select city</option>
                                    <option>City 1</option>
                                    <option>City 2</option>
                                </select>
                            </div>
                        </div>

                        {/* Zip Code and Region */}
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">
                                    Zip Code
                                </label>
                                <input
                                    type="text"
                                    name="zipCode"
                                    value={location.zipCode}
                                    onChange={handleChange}
                                    placeholder="zip/postal code"
                                    className="block w-full px-4 py-2 text-gray-700 bg-gray-100 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
                                />
                            </div>

                            <div className="relative">
                                <label className="block text-sm font-medium text-gray-600 mb-1">
                                    Region
                                </label>
                                <select
                                    name="region"
                                    value={location.region}
                                    onChange={handleChange}
                                    className="block w-full px-4 py-2 text-gray-700 bg-gray-100 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
                                >
                                    <option>Select Region</option>
                                    <option>Region 1</option>
                                    <option>Region 2</option>
                                </select>
                            </div>
                        </div>

                        {/* Street Address */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                Street address
                            </label>
                            <button
                                onClick={handleLocationSelect}
                                className="block w-full px-4 py-2 text-left text-gray-700 bg-gray-100 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
                            >
                                Set Location
                            </button>
                        </div>
                        <div className="flex justify-between">
                            <p>Choose your area</p>
                            <button
                                onClick={handleUseCurrentLocation}
                                className="mb-4 px-3 py-1  text-sm rounded-lg bg-gray-100"
                            >
                                Use Current Location
                            </button>
                        </div>

                        {/* Map */}
                        <div className="mb-4 relative">
                            <div className="w-full h-64 bg-gray-200 rounded-lg overflow-hidden">
                                <iframe
                                    className="w-full h-full"
                                    frameBorder="0"
                                    scrolling="no"
                                    marginHeight="0"
                                    marginWidth="0"
                                    src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=softvence agency&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                                ></iframe>
                            </div>
                        </div>
                        <div className="flex justify-center items-center gap-4 mt-6">
                            {/* Back Button */}
                            <button
                                onClick={handleBack}
                                disabled={currentStep === 1}
                                className={`px-4 py-2 rounded-full border ${currentStep === 1
                                    ? "border-gray-300 text-gray-500 cursor-not-allowed"
                                    : "border-green-500 text-green-500 hover:bg-green-100"
                                    } flex items-center gap-2`}
                            >
                                <AiOutlineArrowLeft /> Back
                            </button>

                            {/* Next Button */}
                            {currentStep <= 3 && (
                                <button
                                    onClick={handleNext}
                                    className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 flex items-center gap-2"
                                >
                                    Next <AiOutlineArrowRight />
                                </button>
                            )}
                        </div>
                    </div>
                )}

                {currentStep === 3 && (
                    <div className="p-6 bg-white w-full max-w-full mx-auto rounded-lg shadow-sm overflow-y-auto">
                        <h2 className="text-2xl font-bold mb-6">Business Details</h2>
                        <form>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Company Name */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Company Name
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="CQD"
                                        className="w-full px-4 py-1 text-gray-700 bg-gray-100 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
                                    />
                                </div>

                                {/* Type Dropdown */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Type
                                    </label>
                                    <select
                                        className="w-full px-4 py-1 text-gray-700 bg-gray-100 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
                                    >
                                        <option>Company type</option>
                                        <option>Type 1</option>
                                        <option>Type 2</option>
                                        <option>Type 3</option>
                                    </select>
                                </div>

                                {/* Industry */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Industry
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Industry name"
                                        className="w-full px-4 py-1 text-gray-700 bg-gray-100 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
                                    />
                                </div>

                                {/* Number of Employees */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Number of Employee
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="0-100"
                                        className="w-full px-4 py-1 text-gray-700 bg-gray-100 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
                                    />
                                </div>

                                {/* Website */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Website
                                    </label>
                                    <input
                                        type="url"
                                        placeholder="link here"
                                        className="w-full px-4 py-1 text-gray-700 bg-gray-100 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
                                    />
                                </div>

                                {/* Address */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Address
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Address here"
                                        className="w-full px-4 py-1 text-gray-700 bg-gray-100 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
                                    />
                                </div>
                            </div>

                            {/* Business Details */}
                            <div className="mt-6">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Business Details
                                </label>
                                <textarea
                                    rows="4"
                                    placeholder="Type here..."
                                    className="w-full px-4 py-1 text-gray-700 bg-gray-100 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
                                ></textarea>
                            </div>

                            {/* Choose Service Dropdown */}
                            <div className="mt-6">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Choose Service
                                </label>
                                <select
                                    className="w-full px-4 py-1 text-gray-700 bg-gray-100 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
                                >
                                    <option>Select Service</option>
                                    <option>Service 1</option>
                                    <option>Service 2</option>
                                    <option>Service 3</option>
                                </select>
                            </div>

                            {/* Service Details */}
                            <div className="mt-6">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Service Details
                                </label>
                                <textarea
                                    rows="4"
                                    placeholder="Type here..."
                                    className="w-full px-4 py-1 text-gray-700 bg-gray-100 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
                                ></textarea>
                            </div>

                            {/* Checkbox */}
                            <div className="mt-6 flex items-center">
                                <input
                                    type="checkbox"
                                    id="shareSubscription"
                                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                />
                                <label
                                    htmlFor="shareSubscription"
                                    className="ml-2 text-sm font-medium text-gray-700"
                                >
                                    I want to share my subscription
                                </label>

                            </div>
                            {/* button */}
                            <div className="flex justify-center items-center gap-4 mt-6">
                                {/* Back Button */}
                                <button
                                    onClick={handleBack}
                                    disabled={currentStep === 1}
                                    className={`px-4 py-2 rounded-full border ${currentStep === 1
                                        ? "border-gray-300 text-gray-500 cursor-not-allowed"
                                        : "border-green-500 text-green-500 hover:bg-green-100"
                                        } flex items-center gap-2`}
                                >
                                    <AiOutlineArrowLeft /> Back
                                </button>

                                {/* Next Button */}
                                {currentStep < 3 && (
                                    <button
                                        onClick={handleNext}
                                        className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 flex items-center gap-2"
                                    >
                                        Next <AiOutlineArrowRight />
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                )}

            </div>
        </div>
    );
};

export default StepForm;
