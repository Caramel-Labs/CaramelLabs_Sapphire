"""Contains output parsers to structure the model's outputs.
"""

from abc import ABC, abstractmethod
from langchain.output_parsers import PydanticOutputParser
from visaguard.data_models import OcrStructuredOutput, OcrValidationResult


class BaseOutputParser(ABC):
    """Abstract class to implement output parser classes.

    Args:
        ABC (class): helper class for creating abstract classes
    """

    @abstractmethod
    async def __new__():
        pass


class OcrStructuringParser(BaseOutputParser):
    """Parse and structure model output for the output of OCR."""

    def __new__(cls):
        """Create and return a single instance of output parser."""

        parser = PydanticOutputParser(
            pydantic_object=OcrStructuredOutput,
        )

        return parser


class OcrValidationParser(BaseOutputParser):
    """Parse and structure model output for the validation of passport details read using OCR."""

    def __new__(cls):
        """Create and return a single instance of output parser."""

        parser = PydanticOutputParser(
            pydantic_object=OcrValidationResult,
        )

        return parser
