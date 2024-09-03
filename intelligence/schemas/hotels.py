# Schemas for hotels


def hotel_individual_serial(hotel) -> dict:
    return {
        "id": str(hotel["_id"]),
        "name": hotel.get("name"),
        "cost": hotel.get("cost"),
        "address": hotel.get("location", {}).get("address"),
        "description": hotel.get("description"),
    }


def hotel_list_serial(hotels) -> list:
    return (hotel_individual_serial(hotel) for hotel in hotels)
