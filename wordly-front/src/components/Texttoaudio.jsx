import React, { useState } from "react";
import { FaPlay, FaUpload, FaCheckCircle, FaCopy, FaMicrophone, FaGlobe } from "react-icons/fa";

const TextToAudio = () => {
  const [text, setText] = useState("");
  const [audioUrl, setAudioUrl] = useState(null);
  const [status, setStatus] = useState("");
  const [progress, setProgress] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState("");

  // Handle Text Input Change
  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  // Generate Audio from Text
  const generateAudio = async () => {
    if (!text || !selectedLanguage) {
      setStatus("Please enter text and select a language.");
      return;
    }

    setStatus("Generating Audio...");
    setProgress(10);

    try {
      const response = await fetch("http://localhost:8000/api/translate/text-to-audio/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, language: selectedLanguage }),
      });

      // Simulated progress effect
      const totalSteps = 5;
      for (let i = 1; i <= totalSteps; i++) {
        setTimeout(() => setProgress(i * 20), i * 500);
      }

      const data = await response.json();
      setTimeout(() => {
        setAudioUrl(data.audio_url || null);
        setStatus("Audio Ready ✅");
        setProgress(100);
      }, totalSteps * 500);
    } catch (error) {
      console.error("Error generating audio:", error);
      setStatus("Error generating audio.");
      setProgress(0);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-black via-purple-900 to-black p-5">
      <div className="relative w-full max-w-3xl p-10 bg-gray-900 text-white rounded-2xl shadow-xl border border-purple-500">
        {/* Header Section */}
        <h2 className="text-5xl font-bold text-center text-purple-400 mb-6 flex items-center justify-center gap-3">
          <FaMicrophone className="text-purple-500" />
          Text To Audio
        </h2>

        {/* Text Input */}
        <textarea
          className="w-full p-4 bg-gray-800 text-white rounded-lg border border-purple-500 min-h-[120px] focus:outline-none shadow-md"
          placeholder="Enter text to convert to audio..."
          value={text}
          onChange={handleTextChange}
        />

        

        {/* Upload Status */}
        {status && (
          <p className="text-sm mt-3 flex items-center justify-center gap-2 text-green-400 font-bold">
            <FaCheckCircle className="animate-pulse" /> {status}
          </p>
        )}

        {/* Progress Bar */}
        {progress > 0 && (
          <div className="w-full bg-gray-700 rounded-full h-3 mt-4 overflow-hidden">
            <div
              className="bg-purple-500 h-3 rounded-full transition-all animate-pulse"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}

        {/* Buttons */}
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            className="px-6 py-2 bg-purple-600 text-white font-bold rounded-lg shadow-md hover:bg-purple-500 transition transform hover:scale-105 disabled:bg-gray-700"
            onClick={generateAudio}
            disabled={progress > 0 && progress < 100}
          >
            Convert to Audio
          </button>
          <select
            className="p-2 border border-purple-500 bg-gray-900 text-white rounded-lg"
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
          >
            <option value="">Select Language</option>
            <option value="hi">Hindi</option>
            <option value="fr">French</option>
          </select>
        </div>

        {/* Audio Player */}
        {audioUrl && (
          <div className="mt-8 flex flex-col items-center bg-gray-800 p-4 rounded-xl border border-purple-500 shadow-md">
            <h3 className="font-bold text-lg text-purple-400 flex items-center gap-2">
              <FaPlay className="text-purple-500" />
              Generated Audio
            </h3>
            <audio controls className="mt-3 w-full">
              <source src={audioUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        )}
      </div>
    </div>
  );
};

export default TextToAudio;
