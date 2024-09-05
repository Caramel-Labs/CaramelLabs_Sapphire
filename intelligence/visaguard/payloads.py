from pydantic import BaseModel


# Visa photos model
class VisaDataModel(BaseModel):
    img1_link: str
    img2_link: str


# OCR result model
class OcrDataModel(BaseModel):
    input_nationality: str
    content: str


# Make module safely exportable
if __name__ == "__main__":
    pass
