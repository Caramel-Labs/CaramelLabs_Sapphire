"""Contains output parsers to structure the model's outputs.
"""

from abc import ABC, abstractmethod
from experience.data_models import ExperienceMetadata
from langchain.output_parsers import PydanticOutputParser


class BaseOutputParser(ABC):
    """Abstract class to implement output parser classes.

    Args:
        ABC (class): helper class for creating abstract classes
    """

    @abstractmethod
    async def __new__():
        pass


class AiGeneratedExperienceParser(BaseOutputParser):
    """Parse and structure model output for an AI-generated experience."""

    def __new__(cls):
        """Create and return a single instance of output parser."""

        parser = PydanticOutputParser(
            pydantic_object=ExperienceMetadata,
        )

        return parser
