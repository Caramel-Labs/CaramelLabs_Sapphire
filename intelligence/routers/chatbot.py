import langchain
from fastapi import APIRouter
from models.chatbot import ChatDataModel
from database.config import remote_mongodb
from reasoning.agents import ToolBoundAgentBuilder

# Setup chatbot router
router = APIRouter(prefix="/chatbot")

# Setup database connection
db = remote_mongodb()

# Set LangChain runtime configurations
langchain.debug = False


# --------------------------------
#             ROUTES
# --------------------------------


# Test router health
@router.get("/ping")
def test_router():
    return {
        "message": "Chatbot router is up and running.",
    }


@router.post("/get-response/")
def get_response(input: ChatDataModel):
    message = input.content
    agent = ToolBoundAgentBuilder()
    response = agent.invoke({"input": message})
    return {
        "data": response,
    }


# Make module safely exportable
if __name__ == "__main__":
    pass
