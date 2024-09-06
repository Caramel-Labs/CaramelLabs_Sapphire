from experiences.output_parsers import AiGeneratedExperienceParser
from experiences.prompts import ExperienceGenerationPromptTemplate
from providers.chat_models import GroqChatModel


class ExperienceGenerationChain:
    def __new__(cls):
        # Define output parser
        parser = AiGeneratedExperienceParser()

        # Define prompt template
        prompt = ExperienceGenerationPromptTemplate()

        # Define model
        chat_model = GroqChatModel()

        # Initialize chain
        chain = prompt | chat_model | parser

        return chain
