from pydantic import BaseModel


# Visa photos model
class VisaDataModel(BaseModel):
    img1_link: str
    img2_link: str


# Make module safely exportable
if __name__ == "__main__":
    pass
