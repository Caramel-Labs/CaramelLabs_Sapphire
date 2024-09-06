const express = require("express");
const experienceController = require("../controllers/experienceController");

const router = express.Router();

router.get("/", experienceController.PreDefinedExperiences);
router.get("/visited", experienceController.getExperienceById);
router.get("/user/:userId", experienceController.getUserExperiences);

module.exports = router;
