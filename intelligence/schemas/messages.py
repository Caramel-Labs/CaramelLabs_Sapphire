# Schemas for messages


def message_individual_serial(message) -> dict:
    return {
        "id": str(message["_id"]),
        "isbot": message.get("isbot"),
        "content": message.get("content"),
        "user": message.get("user"),
    }


def message_list_serial(messages) -> list:
    return [message_individual_serial(message) for message in messages]
