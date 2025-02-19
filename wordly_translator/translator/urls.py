from django.urls import path
from .views import text_to_text_translation, document_translation, speech_to_text, text_to_speech, image_to_text

urlpatterns = [
    path('text/', text_to_text_translation),
    path('document/', document_translation),
    path('speech-to-text/', speech_to_text),
    path('text-to-speech/', text_to_speech),
    path('image-to-text/', image_to_text),
]
