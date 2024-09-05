from langchain_core.prompts import PromptTemplate
from visaguard.output_parsers import OcrStructuringParser, OcrValidationParser


class OcrStructuringPromptTemplate:
    def __new__(cls):
        parser = OcrStructuringParser()

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

        return prompt


class OcrValidationPromptTemplate:
    def __new__(cls):
        parser = OcrValidationParser()

        prompt = PromptTemplate(
            template="""After performing OCR on a passport's biodata page, the following nationality was extracted: {extracted_nationality}.

The passport holder entered this nationality manually: {input_nationality}

Verify whether these two nationalities match, and return a boolean value.

Strictly follow these instructions to structure your output:

{format_instructions}
""",
            input_variables=["input_nationality", "extracted_nationality"],
            partial_variables={"format_instructions": parser.get_format_instructions()},
        )

        return prompt


# Make module safely exportable
if __name__ == "__main__":
    pass
