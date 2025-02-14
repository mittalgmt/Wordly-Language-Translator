import React, { useState } from "react";
import { FaUpload, FaCheckCircle, FaCopy, FaTrash } from "react-icons/fa";

const ImageTranslator = () => {
  const [file, setFile] = useState(null);
  const [translatedText, setTranslatedText] = useState("");
  const [uploadStatus, setUploadStatus] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");

  // Handle file selection
  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setUploadStatus("Uploaded & Ready to Extract ✅");
    }
  };

  // Upload and extract text from image
  const uploadImage = async () => {
    if (!file) return;

    setUploadStatus("Uploading...");
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("http://localhost:8000/api/translate/image-to-text/", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setTranslatedText(data.translated_text || "Error extracting text.");
      setUploadStatus("Text Extracted ✅");
    } catch (error) {
      console.error("Error extracting text:", error);
      setUploadStatus("Error uploading image.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-black via-purple-900 to-black p-5">
      <div className="w-full max-w-3xl p-8 bg-gray-900 text-white rounded-xl shadow-2xl border border-purple-500">
        <h2 className="text-4xl font-bold text-center text-purple-400 mb-6">Image To Text</h2>

        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          {/* Upload Section */}
          <h3 className="font-bold text-lg">Upload an image</h3>
          <div className="border-2 border-dashed border-gray-500 p-6 rounded-lg text-center mt-4">
            <p className="text-gray-300 mb-2">
              {file ? <span className="text-green-400 font-semibold">{file.name}</span> : "Upload your image here"}
            </p>
            <label className="cursor-pointer px-4 py-2 bg-purple-600 text-white font-bold rounded-md flex items-center gap-2 mx-auto w-fit hover:bg-purple-500 transition">
              <FaUpload />
              Upload
              <input type="file" className="hidden" onChange={handleFileChange} />
            </label>
            {uploadStatus && (
              <p className="text-sm mt-2 flex items-center justify-center gap-2 text-green-400">
                <FaCheckCircle /> {uploadStatus}
              </p>
            )}
          </div>

          {/* Buttons & Select Dropdown */}

          {/* Image Text Output */}
          <h3 className="font-bold text-lg mt-6">Image Text</h3>
          <div className="bg-gray-900 p-4 rounded-lg mt-2 min-h-[80px] border border-purple-500"></div>

          <div className="flex justify-start items-center gap-2 mt-3">
            <button className="px-4 py-2 bg-purple-600 text-white font-bold rounded-md hover:bg-purple-500 transition flex items-center gap-2">
              <FaCopy />
              Copy Text
            </button>
            <button
              className="px-6 py-2 bg-purple-600 text-white font-bold rounded-md hover:bg-purple-500 transition"
              onClick={uploadImage}
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
          <div className="bg-gray-900 p-4 rounded-lg mt-2 min-h-[80px] border border-purple-500">
            {translatedText || ""}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageTranslator;
