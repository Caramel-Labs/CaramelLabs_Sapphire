"""Pydantic models for parsing and structuring the model's outputs.
"""

from langchain_core.pydantic_v1 import BaseModel, Field


# Pydantic model for OCR structuring
class OcrStructuredOutput(BaseModel):
    """Pydantic model to process the output of OCR.

    Args:
        BaseModel (pydantic.BaseModel): the BaseModel class from Pydantic
    """

    nationality: str = Field(
        description="The country of nationality of the passport holder.",
    )


# Pydantic model for OCR validation
class OcrValidationResult(BaseModel):
    """Pydantic model to validate the information extracted through OCR.

    Args:
        BaseModel (pydantic.BaseModel): the BaseModel class from Pydantic
    """

    isValid: bool = Field(
        description="Whether the passport is valid (the details match).",
    )


# Make module safely exportable
if __name__ == "__main__":
    pass
