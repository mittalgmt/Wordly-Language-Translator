import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  { title: "Text-to-Text Translation", description: "Instantly translate written text between multiple languages.", image: "https://placehold.co/600x300/blue/white?text=Text+Translation" },
  { title: "Document Translation", description: "Upload and translate entire documents seamlessly.", image: "https://placehold.co/600x300/green/white?text=Document+Translation" },
  { title: "Audio-to-Text Conversion", description: "Convert spoken language into text with high accuracy.", image: "https://placehold.co/600x300/orange/white?text=Audio+to+Text" },
  { title: "Text-to-Audio Conversion", description: "Transform text into natural-sounding speech.", image: "https://placehold.co/600x300/red/white?text=Text+to+Audio" },
  { title: "Image-to-Text Translation", description: "Extract and translate text from images instantly.", image: "https://placehold.co/600x300/purple/white?text=Image+to+Text" },
  { title: "Cross-Language Chat", description: "Chat in real-time with automatic translations.", image: "https://placehold.co/600x300/cyan/white?text=Cross-Language+Chat" }
];

export default function FuturisticComponent() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="w-full min-h-screen px-6 py-12 bg-gradient-to-br from-[#0A0F1A] to-[#1C2333] flex flex-col justify-center items-center gap-12 overflow-hidden">
      <div className="text-center text-white text-6xl font-extrabold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-violet-500 drop-shadow-lg">
        AI-Powered Language Translation
      </div>
      <p className="text-lg text-gray-300 max-w-2xl text-center leading-relaxed">
        Wordly breaks all language barriers with cutting-edge AI translations.
        Experience real-time text, speech, and image translation seamlessly.
      </p>
      <div className="flex gap-6">
        <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white text-lg font-bold rounded-lg shadow-lg transition-transform hover:scale-105 hover:shadow-2xl">
          Translate
        </button>
        <button className="px-6 py-3 bg-transparent border-2 border-cyan-400 text-cyan-400 text-lg font-bold rounded-lg transition-transform hover:scale-105 hover:bg-cyan-500 hover:text-white">
          Chat
        </button>
      </div>
      <div className="w-full max-w-4xl relative overflow-hidden rounded-xl bg-gray-800 p-6 shadow-xl">
        <div className="flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          {slides.map((slide, index) => (
            <div key={index} className="min-w-full flex flex-col items-center gap-4">
              <img className="w-full h-64 rounded-lg shadow-lg object-cover" src={slide.image} alt={slide.title} />
              <h2 className="text-white text-3xl font-bold">{slide.title}</h2>
              <p className="text-gray-300 text-center max-w-md">{slide.description}</p>
              <button className="px-4 py-2 bg-cyan-500 text-white rounded-lg shadow-md hover:bg-cyan-600 transition">Learn More</button>
            </div>
          ))}
        </div>
        <button onClick={prevSlide} className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-3 rounded-full shadow-md hover:bg-gray-600 transition">
          <ChevronLeft size={24} />
        </button>
        <button onClick={nextSlide} className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-3 rounded-full shadow-md hover:bg-gray-600 transition">
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}
