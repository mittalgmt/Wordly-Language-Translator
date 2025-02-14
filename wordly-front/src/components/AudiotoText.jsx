import React, { useState } from "react";
import { FaUpload, FaCheckCircle, FaCopy } from "react-icons/fa";

const AudioTranslator = () => {
  const [file, setFile] = useState(null);
  const [audioText, setAudioText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [uploadStatus, setUploadStatus] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState("");

  // Handle file selection
  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setUploadStatus("Uploaded & Ready to Transcribe ✅");
      setUploadProgress(0); // Reset progress
    }
  };

  // Upload and transcribe audio
  const uploadAudio = async () => {
    if (!file) return;

    setUploadStatus("Uploading...");
    setUploadProgress(10); // Initial progress

    const formData = new FormData();
    formData.append("audio", file);

    try {
      const response = await fetch("http://localhost:8000/api/translate/audio-to-text/", {
        method: "POST",
        body: formData,
      });

      const totalSteps = 5;
      for (let i = 1; i <= totalSteps; i++) {
        setTimeout(() => setUploadProgress(i * 20), i * 500); // Simulated progress
      }

      const data = await response.json();
      setTimeout(() => {
        setAudioText(data.audio_text || "Error transcribing audio.");
        setUploadStatus("Audio Transcribed ✅");
        setUploadProgress(100);
      }, totalSteps * 500);
    } catch (error) {
      console.error("Error transcribing audio:", error);
      setUploadStatus("Error uploading audio.");
      setUploadProgress(0);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-black via-purple-900 to-black p-5">
      <div className="w-full max-w-3xl p-8 bg-gray-900 text-white rounded-xl shadow-2xl border border-purple-500">
        <h2 className="text-4xl font-bold text-center text-purple-400 mb-6">Audio To Text</h2>

        {/* Upload Section */}
        <div className="flex flex-col items-center">
          <label className="cursor-pointer px-6 py-3 bg-gray-800 text-white font-bold rounded-md flex items-center gap-2 w-fit hover:bg-gray-700 transition">
            <FaUpload />
            Upload Audio
            <input type="file" className="hidden" onChange={handleFileChange} />
          </label>
          {uploadStatus && (
            <p className="text-sm mt-2 flex items-center justify-center gap-2 text-green-400">
              <FaCheckCircle /> {uploadStatus}
            </p>
          )}
        </div>

        {/* Upload Progress Bar */}
        {uploadProgress > 0 && (
          <div className="w-full bg-gray-700 rounded-full h-2 mt-4">
            <div
              className="bg-purple-500 h-2 rounded-full transition-all"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
        )}

        {/* Audio Text Output */}
        <h3 className="font-bold text-lg mt-6">Audio Text</h3>
        <div className="bg-gray-800 p-4 rounded-lg mt-2 min-h-[80px] border border-purple-500">{audioText}</div>

        {/* Buttons & Select Dropdown */}
        <div className="flex justify-start items-center gap-3 mt-3">
          <button className="px-4 py-2 bg-purple-600 text-white font-bold rounded-md hover:bg-purple-500 transition flex items-center gap-2">
            <FaCopy />
            Copy Text
          </button>
          <button
            className="px-6 py-2 bg-purple-600 text-white font-bold rounded-md hover:bg-purple-500 transition disabled:bg-gray-700"
            onClick={uploadAudio}
            disabled={uploadProgress > 0 && uploadProgress < 100}
          >
            Translate
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

        {/* Translated Text Output */}
        <h3 className="font-bold text-lg mt-6">Translated Text</h3>
        <div className="bg-gray-800 p-4 rounded-lg mt-2 min-h-[80px] border border-purple-500">{translatedText}</div>
      </div>
    </div>
  );
};

export default AudioTranslator;
