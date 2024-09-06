import langchain
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from chat.routes import router as chat_router
from visaguard.routes import router as visaguard_router
from experience.routes import router as experience_router

# Set LangChain runtime configurations
langchain.debug = False

# Instantiate FastAPI application
app = FastAPI(
    title="Sapphire Intelligence",
    description="Sapphire Intelligence is the reasoning and cognitive aspect of Sapphire.",
)

# Setup routers
app.include_router(chat_router)
app.include_router(visaguard_router)
app.include_router(experience_router)

# Define allowed origins for CORS
origins = [
    "*",
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:3001",
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
@app.get("/", tags=["Sapphire Intelligence (Internals)"])
async def root():
    return {
        "message": "Sapphire Intelligence is up and running.",
    }
