from database.config import remote_mongodb
from schemas.hotels import hotel_individual_serial, hotel_list_serial
from langchain_core.tools import tool


@tool
def get_hotel_information() -> str:
    """Retrieve information related to hotels.

    Returns:
        str: Information related to hotels.
    """

    print("Hotel contextualizer tool is invoked.")

    # Setup database connection
    db = remote_mongodb()

    # Get hotels collection from database
    hotels_collection = db.get_collection("hotels")

    # Get all hotels as generator objects
    hotels = hotel_list_serial(hotels_collection.find())

    # Initialize a string to hold the formatted hotel information
    hotel_info = "The following information is available about hotels affiliated with Sapphire:\n\n"

    # Loop through all hotels and append their details to the string
    for hotel in hotels:
        hotel_info += (
            f"Hotel name: {hotel.get('name')}\n"
            f"Hotel location: {hotel.get('location')}\n"
            f"Hotel description: {hotel.get('description')}\n"
            f"Hotel cost: {hotel.get('cost')}\n\n"
            f"---\n"
        )

    return hotel_info


# Make module safely exportable
if __name__ == "__main__":
    pass
