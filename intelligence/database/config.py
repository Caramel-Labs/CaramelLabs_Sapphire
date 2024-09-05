from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()


def remote_mongodb():
    # Connection URI for Loop's Atlas cluster
    connection_uri = os.getenv("MONGO_URI_STRING")

    # Create MongoDB client using connection URL
    client = MongoClient(connection_uri)

    # Send ping to confirm successful connection
    try:
        client.admin.command("ping")
        print("Atlas Cluster pinged.")
        print("You have successfully connected to MongoDB on the cloud!")
    except Exception as e:
        print(e)

    # Select database from cluster
    db = client.Sapphire

    return db


# Make module safely exportable
if __name__ == "__main__":
    pass
