from langchain_core.prompts import PromptTemplate
from providers.chat_models import GroqChatModel
from visaguard.output_parsers import OcrStructuringParser, OcrValidationParser
from visaguard.prompts import OcrStructuringPromptTemplate, OcrValidationPromptTemplate


class OcrStructuringChain:
    def __new__(cls):
        # Define output parser
        parser = OcrStructuringParser()

        # Define prompt template
        prompt = OcrStructuringPromptTemplate()

        # Define model
        chat_model = GroqChatModel()

        # Initialize chain
        chain = prompt | chat_model | parser

        return chain


class OcrValidationChain:
    def __new__(cls):
        chat_model = GroqChatModel()

        parser = OcrValidationParser()

        prompt = OcrValidationPromptTemplate()

        chain = prompt | chat_model | parser

        return chain


# Make module safely exportable
if __name__ == "__main__":
    pass
