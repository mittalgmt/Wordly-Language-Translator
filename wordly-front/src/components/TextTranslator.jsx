import React, { useState } from "react";

const TextTranslator = () => {
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");

  const handleTranslate = async () => {
    if (!selectedLanguage) return;

    try {
      const response = await fetch("http://127.0.0.1:8000/api/translate/text/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inputText, target_lang: selectedLanguage }),
      });
      const data = await response.json();
      setTranslatedText(data.translated_text || data.message);
    } catch (error) {
      console.error("Translation error:", error);
      setTranslatedText("Error translating text");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-black via-purple-900 to-black p-5">
      <div className="w-full max-w-4xl p-10 bg-gray-900 text-white rounded-xl shadow-2xl border border-purple-500">
        <h1 className="text-4xl font-bold text-center text-purple-400 mb-8">
          Text Translator
        </h1>
        <div className="flex justify-between gap-6">
          <textarea
            className="w-1/2 p-4 border border-purple-500 rounded-lg bg-black text-white h-48"
            placeholder="Enter Text..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          ></textarea>
          <textarea
            className="w-1/2 p-4 border border-purple-500 rounded-lg bg-black text-white h-48"
            placeholder="Translated Text..."
            value={translatedText}
            readOnly
          ></textarea>
        </div>
        <div className="flex justify-between items-center mt-6">
          <button
            className="px-6 py-2 bg-purple-500 text-black font-bold rounded-lg hover:bg-purple-400 transition"
            onClick={handleTranslate}
          >
            Translate
          </button>
          <select
            className="p-2 border border-purple-500 bg-black text-white rounded-lg"
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
          >
            <option value="">Select Language</option>
            <option value="hi">Hindi</option>
            <option value="fr">French</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default TextTranslator;
