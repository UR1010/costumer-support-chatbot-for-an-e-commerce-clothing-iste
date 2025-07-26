from fastapi import FastAPI
from chat import router as chat_router

app = FastAPI(
    title="Customer Support Chatbot",
    description="Handles chat queries using OpenAI and stores conversation history.",
    version="1.0.0"
)

# Include the chat routes
app.include_router(chat_router)

# Root route (optional)
@app.get("/")
def read_root():
    return {"message": "Chatbot backend is running!"}