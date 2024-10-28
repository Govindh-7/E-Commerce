import React from 'react';
import shop from '../assets/shop.png'; // Ensure the image is in the correct path

const Hero = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-indigo-600 to-purple-700 text-white p-8 md:p-12 rounded-lg shadow-xl overflow-hidden transform transition-transform duration-500 hover:scale-105">
      
      {/* Text Section */}
      <div className="w-full md:w-1/2 mb-10 md:mb-0 animate-fadeInLeft space-y-4 md:space-y-6">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-tight mb-2">
          Welcome to Our E-Store!
        </h1>
        <p className="text-lg md:text-xl font-light leading-relaxed text-gray-200">
          Discover the best products at amazing prices. Shop with ease and confidence.
        </p>
        <button className="mt-6 bg-gradient-to-r from-yellow-400 to-yellow-500 text-blue-800 px-8 py-3 rounded-lg font-semibold shadow-lg transform transition duration-300 ease-in-out hover:from-yellow-500 hover:to-yellow-600 hover:-translate-y-1 hover:shadow-xl">
          Shop Now
        </button>
      </div>

      {/* Image Section */}
      <div className="w-full md:w-1/2 h-96 md:h-[30rem] flex justify-center items-center overflow-hidden rounded-lg shadow-lg animate-fadeInRight">
        <img
          src={shop} // Using the new image source
          alt="Shopping illustration"
          className="w-full h-full object-contain transform transition-transform duration-500 ease-in-out hover:scale-105"
        />
      </div>
    </div>
  );
};

export default Hero;
