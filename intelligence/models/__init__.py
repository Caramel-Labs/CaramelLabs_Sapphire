"""
# Models

These are data models that will be used to handle, manipulate and validate data
sent to Sapphire Intelligence over an HTTP request.

Models are created by subclassing Pydantic's `BaseModel` class.

## List of Available Models

Sapphire Intelligence includes the following data models:

1. `ChatDataModel` to handle data to be sent to the chatbot agent (`from models.chatbot import ChatDataModel`)
```
class ChatDataModel(BaseModel):
    content: str
    userId: str
```

2. `VisaDataModel` to handle image data with faces to match and verify (`from models.visa import VisaDataModel`)
```
class VisaDataModel(BaseModel):
    img1_link: str
    img2_link: str
```
"""
