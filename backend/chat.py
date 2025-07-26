import openai
from sqlalchemy.orm import Session
from .models import Conversation
from .database import SessionLocal

openai.api_key = "your_openai_api_key"

def generate_response(message: str) -> str:
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": message}]
    )
    return response['choices'][0]['message']['content']

def handle_chat(message: str, conversation_id: int = None):
    db: Session = SessionLocal()
    ai_response = generate_response(message)
    
    convo = Conversation(user_message=message, ai_response=ai_response)
    db.add(convo)
    db.commit()
    db.refresh(convo)
    db.close()

    return convo.id, ai_response

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter()

class ChatRequest(BaseModel):
    message: str
    conversation_id: int = None

class ChatResponse(BaseModel):
    conversation_id: int
    ai_response: str

@router.post("/api/chat", response_model=ChatResponse)
def chat_endpoint(payload: ChatRequest):
    try:
        conv_id, response = handle_chat(payload.message, payload.conversation_id)
        return {"conversation_id": conv_id, "ai_response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))