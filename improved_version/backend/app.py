import requests
import re
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# Initialize FastAPI app
app = FastAPI()

# Enable CORS for Flutter app
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (change if needed)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define request model
class ChatRequest(BaseModel):
    message: str

# DeepSeek API URL
DEEPSEEK_API_URL = "http://127.0.0.1:11434/api/generate"

def clean_response(text: str) -> str:
    """ Remove <think> tags and extra whitespace from the AI response. """
    text = re.sub(r"<think>.*?</think>", "", text, flags=re.DOTALL)  # Remove <think> tags
    text = text.strip()  # Remove leading/trailing spaces
    return text

@app.post("/chat/")
async def chat_with_deepseek(request: ChatRequest):
    try:
        # Prepare request payload for DeepSeek model
        payload = {
            "model": "deepseek-r1:1.5b",  # Model name
            "prompt": request.message,
            "stream": False  # Disable streaming for simplicity
        }

        # Send request to DeepSeek model via Ollama
        response = requests.post(DEEPSEEK_API_URL, json=payload)

        # Check if the response contains valid JSON
        try:
            result = response.json()
        except requests.exceptions.JSONDecodeError:
            raise HTTPException(status_code=500, detail="Invalid JSON response from DeepSeek API")

        # Extract and clean response text
        raw_response = result.get("response", "No response generated.")
        cleaned_response = clean_response(raw_response)

        return {"response": cleaned_response}

    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Request error: {str(e)}")
