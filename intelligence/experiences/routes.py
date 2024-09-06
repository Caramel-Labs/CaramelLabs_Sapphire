from fastapi import APIRouter
from database.config import remote_mongodb
from experiences.payloads import PlaceList
from experiences.chains import ExperienceGenerationChain

# Setup chatbot router
router = APIRouter(
    prefix="/experience",
    tags=["Sapphire GenExperience"],
)

# Setup database connection
db = remote_mongodb()


# --------------------------------
#             ROUTES
# --------------------------------


# Test router health
@router.get("/ping")
def test_router():
    return {
        "message": "Sapphire GenExperience router is up and running.",
    }


@router.post("/generate/")
def generate_experience(request: PlaceList):
    # Get information sent over request body
    places = request.data

    places_string = ""
    # Iterate through each place and build the string
    for place in places:
        place_info = (
            f"Name: {place.name}\n"
            f"Location: {place.location}\n"
            f"Description: {place.description}\n"
            "---" + "\n"  # Separator for readability
        )
        # Add this place's information to the main string
        places_string += place_info

    # Initialize experience generation chain
    chain = ExperienceGenerationChain()

    # Invoke chain with information on list of places
    output = chain.invoke({"information": places_string})

    return output


# Make module safely exportable
if __name__ == "__main__":
    pass
