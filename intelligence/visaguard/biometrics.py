from deepface import DeepFace


class FaceExaminer:
    def __init__(self, model="VGG-Face") -> None:
        self.model_name = model

    def check_faces(self, photo_1_link, photo_2_link):
        result = DeepFace.verify(
            img1_path=photo_1_link,
            img2_path=photo_2_link,
            model_name=self.model_name,
        )
        return result


# Make module safely exportable
if __name__ == "__main__":
    pass
