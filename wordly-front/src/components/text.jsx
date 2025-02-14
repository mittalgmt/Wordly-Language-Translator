import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import textTranslation from "../assets/images/text-translation.jpg";
import documnetTranslation from "../assets/images/document-translation.jpg"
import AudiotoText from "../assets/images/Audio-text-translation.jpg"
import Texttoaudio from "../assets/images/text-audio.jpg"
import crosslang from "../assets/images/cross-languagechat.jpg"
import imagetotext from "../assets/images/image-text.jpg"
import global from "../assets/images/global.jpg"
import realtimechat from "../assets/images/realtimechat.jpg"

const slides = [
  {
    title: "Text-to-Text Translation",
    description: "Instantly translate written text between multiple languages.",
    image: textTranslation,
    link: "#",
  },
  {
    title: "Document Translation",
    description: "Translate entire documents seamlessly.",
    image: documnetTranslation,
    link: "#",
  },
  {
    title: "Audio-to-Text Translation",
    description: "Convert spoken words into accurate text.",
    image: AudiotoText,
    link: "#",
  },
  {
    title: "Text-to-Audio Translation",
    description: "Convert written text into spoken words.",
    image: Texttoaudio,
    link: "#",
  },
  {
    title: "Image-to-Text Translation",
    description: "Extract text from images and translate it instantly.",
    image: imagetotext,
    link: "#",
  },
  {
    title: "Cross-Language Chat",
    description: "Seamless real-time chat translation.",
    image: crosslang,
    link: "#",
  },
];

export default function Carousel() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <div className="flex flex-col items-center space-y-6 p-6 bg-gradient-to-r from-black via-purple-900 to-black min-h-screen text-white">
      <div className="flex flex-col items-center text-center px-6">
  <h1 className="mt-10 text-6xl md:text-7xl font-bold">
    Transforming Communication Across Languages Effortlessly
  </h1>
  <p className="text-gray-300 mt-10 max-w-5xl mx-auto md:text-2xl">
    Wordly - Language Translator empowers you to break language barriers with ease. 
    Experience seamless text, speech, and image translations, all in one platform.
  </p>
</div>

      {/* Carousel Section */}
      <div className="relative w-full max-w-4xl mt-10 flex items-center border border-purple-500 rounded-lg shadow-lg p-6 bg-gray-900">
        {/* Left Side - Image */}
        <div className="w-1/2">
          <img
            src={slides[current].image}
            alt={slides[current].title}
            className="w-[390px] h-[300px] rounded-lg object-cover"
          />
        </div>

        {/* Right Side - Content */}
        <div className="w-1/2 pl-4">
          <h2 className="text-5xl font-bold text-purple-400">{slides[current].title}</h2>
          <p className="text-gray-300 text-sm mt-5 md:text-xl">{slides[current].description}</p>

          <a
            href={slides[current].link}
            className="mt-4 inline-block bg-purple-700 text-white px-4 py-2 rounded-lg shadow-md hover:bg-purple-500 transition"
          >
            Learn More
          </a>
        </div>

        {/* Left Button */}
        <button
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-purple-700 text-white p-3 rounded-full hover:bg-purple-500 transition"
          onClick={prevSlide}
        >
          <FaArrowLeft className="text-lg" />
        </button>

        {/* Right Button */}
        <button
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-purple-700 text-white p-3 rounded-full hover:bg-purple-500 transition"
          onClick={nextSlide}
        >
          <FaArrowRight className="text-lg" />
        </button>
      </div>

      {/* Navigation Dots */}
      <div className="flex space-x-2 mt-4">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`h-3 w-3 rounded-full ${
              index === current ? "bg-purple-400" : "bg-gray-500"
            } transition`}
          ></span>
        ))}
      </div>
      {/* Features Section */}
      <div className="w-full max-w-6xl mt-12">
        <h2 className="text-4xl font-bold text-center text-purple-400 mb-6">Key Features</h2>
        <p className="text-gray-300 text-center mb-8 md:text-xl">
          Our translation platform provides a wide range of features to make communication seamless across different languages.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Feature 1 */}
          <div className="border border-purple-500 rounded-lg shadow-lg p-4 bg-black hover:bg-gray-900 transition">
            <img
              src={global}
              alt="Global Communication"
              className="h-[300px] rounded-lg object-cover w-full"
            />
            <h3 className="text-lg font-semibold mt-3 text-purple-400">Global Reach</h3>
            <p className="text-gray-400">Translate seamlessly across multiple languages and connect with the world.</p>
          </div>

          {/* Feature 2 */}
          <div className="border border-purple-500 rounded-lg shadow-lg p-4 bg-black hover:bg-gray-900 transition">
            <img
              src={realtimechat}
              alt="Real-Time Chat"
              className="rounded-lg object-cover w-full h-[300px]"
            />
            <h3 className="text-lg font-semibold mt-3 text-purple-400">Real-Time Chat</h3>
            <p className="text-gray-400">Chat with anyone, anywhere, in any language using AI-powered translation.</p>
          </div>

          {/* Feature 3 */}
          <div className="border border-purple-500 rounded-lg shadow-lg p-4 bg-black hover:bg-gray-900 transition">
            <img
              src={AudiotoText}
              alt="Speech-to-Text"
              className="rounded-lg object-cover w-full h-[300px]"
            />
            <h3 className="text-lg font-semibold mt-3 text-purple-400">Speech-to-Text</h3>
            <p className="text-gray-400">Convert spoken words into text for meetings, interviews, and accessibility.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
