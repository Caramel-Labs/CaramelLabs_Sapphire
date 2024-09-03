from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers.chatbot import router as chatbot_router
from routers.visa import router as visa_router

# Instantiate FastAPI application
app = FastAPI()

# Setup routers
app.include_router(chatbot_router)
app.include_router(visa_router)

# Define allowed origins for CORS
origins = [
    "*",
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:4000",
]

# Setup CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Root route (to test service health)
@app.get("/")
async def root():
    return {
        "message": "Sapphire Intelligence is up and running.",
    }
