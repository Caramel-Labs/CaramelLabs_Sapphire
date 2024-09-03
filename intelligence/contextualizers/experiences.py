from database.config import remote_mongodb
from schemas.experiences import experience_individual_serial, experience_list_serial
from langchain_core.tools import tool


@tool
def get_experience_information() -> str:
    """Retrieve information related to experiences.
    Experiences are basically things to do in Sri Lanka. They are collections of closely related places to visit.

    Returns:
        str: Information related to experiences.
    """

    print("Experience contextualizer tool is invoked.")

    # Setup database connection
    db = remote_mongodb()

    # Get experiences collection from database
    experiences_collection = db.get_collection("experiences")

    # Get all experiences as generator objects
    experiences = experience_list_serial(experiences_collection.find())

    # Initialize a string to hold the formatted experience information
    experience_info = "The following information is available about curated experiences in the Sapphire app:\n\n"

    # Loop through all experiences and append their details to the string
    for experience in experiences:
        experience_info += (
            f"Experience name: {experience.get('name')}\n"
            f"Experience description: {experience.get('description')}\n"
            f"Experience cost: {experience.get('cost')}\n"
            f"Experience location: {experience.get('location')}\n"
            f"---\n"
        )

    return experience_info


# Make module safely exportable
if __name__ == "__main__":
    pass