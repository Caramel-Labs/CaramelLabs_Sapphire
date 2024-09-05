"""Pydantic models for parsing and structuring the model's outputs.
"""

from langchain_core.pydantic_v1 import BaseModel, Field


# Pydantic model for AI-generated experiences
class AiGeneratedExperience(BaseModel):
    """Pydantic model to process an AI-generated experience.

    Args:
        BaseModel (pydantic.BaseModel): the BaseModel class from Pydantic
    """

    experience_name: str = Field(
        description="The name of the experience, usually a summary of the locations provided. Is usually not more than a few words long.",
    )

    experience_description: str = Field(
        description="A description of the experience, which includes information about the locations provided. Can be a few paragraphs long.",
    )
