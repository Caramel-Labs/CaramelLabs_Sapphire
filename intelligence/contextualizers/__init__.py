"""
# Contextualizers

Contextualizers are functions that yield data-aware context to agents for better reasoning.
They provide agents with the necessary context to reason and answer with minimal hallucinations.

In LangChain nomenclature, contextualizers are "tools" that can be invoked by agents with tool-calling capabilities.
They are created by adding the `@tool` decorator.

## List of Available Contextualizers

Sapphire Intelligence includes contextualizers to provide agents with information regarding:

1. Hotels (`from contextualizers.hotels import get_hotel_information`)
2. Experiences (`from contextualizers.experiences import get_experience_information`)
"""
