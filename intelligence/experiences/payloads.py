from typing import List
from pydantic import BaseModel


# Pydantic model for each place
class Place(BaseModel):
    name: str
    location: str
    description: str


# Pydantic model for the request body
class PlaceList(BaseModel):
    data: List[Place]
