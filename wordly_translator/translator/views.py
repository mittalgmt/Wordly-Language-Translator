from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from langdetect import detect
from transformers import pipeline
from rest_framework.parsers import MultiPartParser
from pdfminer.high_level import extract_text
import docx
import speech_recognition as sr
from gtts import gTTS
from django.http import FileResponse
import pytesseract
from PIL import Image
from django.core.files.uploadedfile import InMemoryUploadedFile
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView

class TranslatorView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        return Response({"message": "Translator service is available to all."})
# Load Translation Model (English ↔ French)
translator = pipeline("translation_en_to_fr", model="Helsinki-NLP/opus-mt-en-fr")

@api_view(['POST'])
def text_to_text_translation(request):
    data = request.data
    text = data.get("text")
    target_lang = data.get("target_lang", "fr") 
    
    detected_lang = detect(text)

    if detected_lang != target_lang:
        translated_text = translator(text, max_length=512)[0]['translation_text']
        return Response({"translated_text": translated_text, "detected_lang": detected_lang})
    else:
        return Response({"message": "Text is already in the target language."})


@api_view(['POST'])
def document_translation(request):
    file = request.FILES['file']
    
    if file.name.endswith('.pdf'):
        text = extract_text(file)
    elif file.name.endswith('.docx'):
        doc = docx.Document(file)
        text = "\n".join([para.text for para in doc.paragraphs])
    else:
        return Response({"error": "Unsupported file format"}, status=400)

    translated_text = translator(text, max_length=512)[0]['translation_text']
    return Response({"translated_text": translated_text})



@api_view(['POST'])
def speech_to_text(request):
    file = request.FILES['audio']
    recognizer = sr.Recognizer()

    with sr.AudioFile(file) as source:
        audio = recognizer.record(source)
        text = recognizer.recognize_google(audio)

    translated_text = translator(text, max_length=512)[0]['translation_text']
    return Response({"original_text": text, "translated_text": translated_text})


@api_view(['POST'])
def text_to_speech(request):
    text = request.data.get("text")
    tts = gTTS(text, lang='fr')
    tts.save("output.mp3")
    return FileResponse(open("output.mp3", "rb"), content_type="audio/mp3")




@api_view(['POST'])
def image_to_text(request):
    file = request.FILES['image']
    image = Image.open(file)
    extracted_text = pytesseract.image_to_string(image)

    translated_text = translator(extracted_text, max_length=512)[0]['translation_text']
    return Response({"original_text": extracted_text, "translated_text": translated_text})
