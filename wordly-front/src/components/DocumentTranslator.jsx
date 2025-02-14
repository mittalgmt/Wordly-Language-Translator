import React, { useState } from "react";
import { FaUpload, FaCheckCircle } from "react-icons/fa";

const DocumentTranslator = () => {
  const [file, setFile] = useState(null);
  const [translatedText, setTranslatedText] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [uploadStatus, setUploadStatus] = useState("");

  // Handle file selection
  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setUploadStatus("Uploaded & Ready to Translate ✅");
    }
  };

  // Upload and translate document
  const uploadFile = async () => {
    if (!file || !selectedLanguage) return;

    setUploadStatus("Uploading...");
    const formData = new FormData();
    formData.append("file", file);
    formData.append("target_lang", selectedLanguage);

    try {
      const response = await fetch("http://localhost:8000/api/translate/document/", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setTranslatedText(data.translated_text || "Error translating document.");
      setUploadStatus("Translation Completed ✅");
    } catch (error) {
      console.error("Translation Error:", error);
      setUploadStatus("Error uploading file.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-black via-purple-900 to-black p-5">
      <div className="w-full max-w-3xl p-8 bg-gray-800 text-white rounded-xl shadow-2xl border border-purple-500">
        <h2 className="text-4xl font-bold text-center text-purple-400 mb-6">
          Document Translator
        </h2>

        <div className="bg-gray-900 p-6 rounded-lg shadow-md">
          {/* File Upload Box */}
          <div className="border-2 border-dashed border-purple-500 p-6 rounded-lg text-center">
            <p className="text-gray-400 mb-2">
              {file ? (
                <span className="text-green-400 font-semibold">{file.name}</span>
              ) : (
                "Upload File here"
              )}
            </p>
            <label className="cursor-pointer px-4 py-2 bg-purple-500 text-gray-900 font-bold rounded-md flex items-center gap-2 mx-auto w-fit">
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
          <div className="flex justify-between items-center mt-6">
            <button
              className={`px-6 py-2 font-bold rounded-lg transition ${
                !selectedLanguage
                  ? "bg-gray-600 cursor-not-allowed text-gray-300"
                  : "bg-purple-500 text-gray-900 hover:bg-purple-400"
              }`}
              onClick={uploadFile}
              disabled={!selectedLanguage} // Disable until a language is selected
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

          {/* Translated Text Area */}
          <div className="bg-gray-900 p-4 rounded-lg mt-6 border border-purple-500 min-h-[100px]">
            <p className="text-white-400 text-center">
              {translatedText || "Translation will appear here..."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentTranslator;
