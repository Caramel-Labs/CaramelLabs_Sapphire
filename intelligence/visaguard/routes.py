from fastapi import APIRouter
from database.config import remote_mongodb
from visaguard.biometrics import FaceExaminer
from visaguard.payloads import OcrDataModel, VisaDataModel
from visaguard.chains import OcrStructuringChain, OcrValidationChain

# Setup visa router
router = APIRouter(
    prefix="/visaguard",
    tags=["Sapphire VisaGuard"],
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
        "message": "Visa router is up and running.",
    }


# Match faces of uploaded photos
@router.post("/check-faces/")
def check_faces(data: VisaDataModel):
    # Get image links from request body
    img1_link = data.img1_link
    img2_link = data.img2_link

    # Initializer face examiner
    face_examiner = FaceExaminer()

    # Invoke face examiner with image links
    result = face_examiner.check_faces(img1_link, img2_link)

    return {
        "data": result,
    }


# Get structured OCR output
@router.post("/validate-ocr/")
def validate_ocr(input: OcrDataModel):
    print("ravindu")
    # Get result of OCR from request body
    ocr_reading = input.content

    print(ocr_reading)

    # Initialize OCR validation chain
    structuring_chain = OcrStructuringChain()

    # Invoke chain using OCR result
    output = structuring_chain.invoke({"content": ocr_reading})

    # Combine input and output
    combined_output = {
        "input_nationality": input.input_nationality,
        "extracted_nationality": output.nationality,
    }

    print(combined_output)

    validation_chain = OcrValidationChain()

    final_output = validation_chain.invoke(combined_output)

    return final_output


# Make module safely exportable
if __name__ == "__main__":
    pass
