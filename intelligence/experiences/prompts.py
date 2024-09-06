from langchain_core.prompts import PromptTemplate
from experiences.output_parsers import AiGeneratedExperienceParser


class ExperienceGenerationPromptTemplate:
    def __new__(cls):
        parser = AiGeneratedExperienceParser()

        prompt = PromptTemplate(
            template="""Consider the following information about a list of closely related places in Sri Lanka:

{information}

An "experience" is an itinerary of places to visit.

Use this information to generate metadata about an experience. The metadata of this experience include:

1. The name (title) of the experience.
2. A oneliner that creatively summarizes the experience.
3. A description of a few paragraphs that describes the experience.

Strictly follow these instructions to structure your output:

{format_instructions}
""",
            input_variables=["information"],
            partial_variables={"format_instructions": parser.get_format_instructions()},
        )

        return prompt
