from langchain_core.prompts import (
    PromptTemplate,
    ChatPromptTemplate,
    MessagesPlaceholder,
    HumanMessagePromptTemplate,
    SystemMessagePromptTemplate,
)

# Instruction prompts

BASE_INSTRUCTION_PROMPT = """You are a helpful AI assistant who provides information requested by the user.
Answer the queries based on the available data.
You are allowed to use tools, but do not mention anything about them in your response.
If the user greets you, greet them back in a friendly manner without invoking any tools."""

UPDATED_INSTRUCTION_PROMPT = """You are a helpful AI assistant for 'Sapphire', a mobile app for digital nomads who are hoping to visit / living and working in Sri Lanka.
The user can ask you about hotels, experiences (things to do in Sri Lanka), and more.
You are allowed to use tools, but do not mention anything about them in your response.
If the user greets you, greet them back in a friendly manner without invoking any tools."""


class ToolBoundAgentPromptTemplate:
    def __new__(cls):
        prompt = ChatPromptTemplate.from_messages(
            [
                SystemMessagePromptTemplate(
                    prompt=PromptTemplate(
                        input_variables=[],
                        template=ENSEMBLE_PROMPT,
                    )
                ),
                MessagesPlaceholder(
                    variable_name="chat_history",
                    optional=True,
                ),
                HumanMessagePromptTemplate(
                    prompt=PromptTemplate(
                        input_variables=["input"],
                        template="{input}",
                    )
                ),
                MessagesPlaceholder(
                    variable_name="agent_scratchpad",
                ),
            ]
        )

        return prompt


# Ensemble prompts

ENSEMBLE_PROMPT = """
### Prelude ###
You are Sapphire AI, a helpful AI assistant available in the "Sapphire" App.
Sapphire is a mobile app that acts as a guide to digital nomads who are either hoping to visit Sri Lanka or already residing and working in Sri Lanka.
Sapphire includes information about places to visit, experiences and activities to do, and accommodations with co-working facilities.

### Instructions ###
Answer the user's queries appropriately. You are allowed to use tools, but do not mention anything about them in your response.
Detailed and lengthy responses are fine. If the user greets you, greet them back in a friendly manner without invoking any tools.
Politely refuse to answer questions that are not related to information available in Sapphire or tourism in Sri Lanka.
"""

ENSEMBLE_REACT_PROMPT = """
### Prelude ###
You are Sapphire AI, a helpful AI assistant available in the "Sapphire" App.
Sapphire is a mobile app that acts as a guide to digital nomads who are either hoping to visit Sri Lanka or already residing and working in Sri Lanka.
Sapphire includes information about places to visit, experiences and activities to do, and accommodations with co-working facilities.
You have access to the following tools:
{tools}

### Instructions ###
Answer the user's queries appropriately. You are allowed to use tools, but do not mention anything about them in your response.
You must use one of these tools: {tool_names}
Detailed and lengthy responses are fine. If the user greets you, greet them back in a friendly manner without invoking any tools.
Politely refuse to answer questions that are not related to information available in Sapphire or tourism in Sri Lanka.
Thought: {agent_scratchpad}
"""


class ReActAgentPromptTemplate:
    def __new__(cls):
        prompt = ChatPromptTemplate.from_messages(
            [
                SystemMessagePromptTemplate(
                    prompt=PromptTemplate(
                        input_variables=[],
                        template=ENSEMBLE_REACT_PROMPT,
                    )
                ),
                MessagesPlaceholder(
                    variable_name="chat_history",
                    optional=True,
                ),
                HumanMessagePromptTemplate(
                    prompt=PromptTemplate(
                        input_variables=["input"],
                        template="{input}",
                    )
                ),
                # MessagesPlaceholder(
                #     variable_name="agent_scratchpad",
                # ),
            ]
        )

        return prompt


# Make module safely exportable
if __name__ == "__main__":
    pass
