"""Pydantic models for parsing and structuring the model's outputs.
"""

from langchain_core.pydantic_v1 import BaseModel, Field


# Pydantic model for structuring experience information
class ExperienceMetadata(BaseModel):
    """Pydantic model to structure an experience's metadata.

    Args:
        BaseModel (pydantic.BaseModel): the BaseModel class from Pydantic
    """

    experience_title: str = Field(
        description="The title of the experience. Do not generate longer than a few words.",
    )

    experience_oneliner: str = Field(
        description="A catchy and creative oneliner that summarizes the experience. Do not generate longer than a few words.",
    )

    experience_description: str = Field(
        description="A description of the experience. Can be a few paragraphs long.",
    )
