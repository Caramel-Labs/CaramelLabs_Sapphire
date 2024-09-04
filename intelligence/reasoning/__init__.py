"""
# Reasoning

This is the "intelligent" aspect of Sapphire Intelligence. This module includes:

1. `agents` - systems that can utilize LLMs and chat models to intelligently decide which actions to take, when provided with a task or query.

Agents are able to intelligently decide a course of action, which external tools to invoke
and when to stop their iterative reasoning process and provide a response.

2. `prompts` - string-based inputs to LLMs to control agent behaviour and directives.

Prompts help instruct agents to ensure they follow strict protocols, and may be composed of multiple prompts themselves (ensemble prompts).

## List of Available Agents

Sapphire Intelligence includes the following agents:

1. `ToolBoundAgentBuilder` - a simple `AgentExecutor` that creates a runnable agent with tool-calling capabilities

Import: `from reasoning.agents import ToolBoundAgentBuilder`

2. `ReActAgentBuilder` - an `AgentExecutor` that creates a runnable agent with tool-calling capabilities following the "ReAct" protocol.

Import: `from reasoning.agents import ReActAgentBuilder`

## List of Available Prompt Templates

Sapphire Intelligence includes the following prompt template classes:

1. `ToolBoundAgentPromptTemplate` - instruction prompt to drive agents created using `ToolBoundAgentBuilder`.

Import: `from reasoning.prompts import ToolBoundAgentPromptTemplate`

2. `ReActAgentPromptTemplate` - instruction prompt to drive agents created using `ReActAgentBuilder`.

Import: `from reasoning.prompts import ReActAgentPromptTemplate`
"""
