from fastapi import APIRouter
from models.visa import VisaDataModel
from biometrics.face import FaceExaminer
from database.config import remote_mongodb

# Setup visa router
router = APIRouter(prefix="/visa")

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


@router.post("/check-faces/")
def get_response(data: VisaDataModel):
    img1_link = data.img1_link
    img2_link = data.img2_link
    face_examiner = FaceExaminer()
    result = face_examiner.check_faces(img1_link, img2_link)
    return {
        "data": result,
    }
