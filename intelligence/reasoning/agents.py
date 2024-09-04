from providers.chat_models import GroqChatModel
from contextualizers.hotels import get_hotel_information
from reasoning.prompts import ToolBoundAgentPromptTemplate, ReActAgentPromptTemplate
from contextualizers.experiences import get_experience_information
from langchain.agents import (
    AgentExecutor,
    create_react_agent,
    create_tool_calling_agent,
)


class ToolBoundAgentBuilder:
    def __new__(cls):
        # Initialize model to be used by agent
        model = GroqChatModel()

        # Build agent toolkit (contextualizers)
        toolkit = [get_hotel_information, get_experience_information]

        # Define agent instruction prompt
        prompt = ToolBoundAgentPromptTemplate()

        # Create agent with tool-calling capabilities
        agent = create_tool_calling_agent(
            model,
            toolkit,
            prompt,
        )

        # Define agent executor runtime
        runnable_agent = AgentExecutor(
            agent=agent,
            tools=toolkit,
            verbose=True,
        )

        return runnable_agent


class ReActAgentBuilder:
    def __new__(cls):
        # Initialize model to be used by agent
        model = GroqChatModel()

        # Build agent toolkit (contextualizers)
        toolkit = [get_hotel_information, get_experience_information]

        # Define agent instruction prompt
        prompt = ReActAgentPromptTemplate()

        # Create ReAct agent with tool-calling capabilities
        agent = create_react_agent(
            model,
            toolkit,
            prompt,
        )

        # Define agent executor runtime
        runnable_agent = AgentExecutor(
            agent=agent,
            tools=toolkit,
            verbose=True,
        )

        return runnable_agent


# Make module safely exportable
if __name__ == "__main__":
    pass
