from langchain_core.prompts import PromptTemplate
from providers.chat_models import GroqChatModel
from visaguard.output_parsers import OcrStructuringParser, OcrValidationParser


class OcrStructuringChain:
    def __new__(cls):
        # Define output parser
        parser = OcrStructuringParser()

        # Define prompt template
        prompt = PromptTemplate(
            template="""Consider the following content extracted from the biodata page of a passport using OCR:

{content}

Extract the country of nationality of the passport holder using the above information.

Use the following instructions to structure your output:

{format_instructions}
""",
            input_variables=["content"],
            partial_variables={"format_instructions": parser.get_format_instructions()},
        )

        # Define model
        chat_model = GroqChatModel()

        # Initialize chain
        chain = prompt | chat_model | parser

        return chain


class OcrValidationChain:
    def __new__(cls):
        chat_model = GroqChatModel()

        validation_parser = OcrValidationParser()

        validation_prompt = PromptTemplate(
            template="""After performing OCR on a passport's biodata page, the following nationality was extracted: {extracted_nationality}.

The passport holder entered this nationality manually: {input_nationality}

Verify whether these two nationalities match, and return a boolean value.

Strictly follow these instructions to structure your output:

{format_instructions}
""",
            input_variables=["input_nationality", "extracted_nationality"],
            partial_variables={
                "format_instructions": validation_parser.get_format_instructions()
            },
        )

        chain = validation_prompt | chat_model | validation_parser

        return chain
