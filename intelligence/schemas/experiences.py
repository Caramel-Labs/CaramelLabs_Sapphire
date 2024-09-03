# Schemas for experiences


def experience_individual_serial(experience) -> dict:
    return {
        "id": str(experience["_id"]),
        "name": experience.get("name"),
        "description": experience.get("description"),
        "cost": experience.get("cost"),
        "location": experience.get("location"),
    }


def experience_list_serial(experiences) -> list:
    return (experience_individual_serial(experience) for experience in experiences)
