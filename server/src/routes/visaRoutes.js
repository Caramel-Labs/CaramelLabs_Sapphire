const express = require("express");
const VisaController = require("../controllers/visaControllers");

const router = express.Router();

// Route to create a new visa
router.post("/", VisaController.createVisa);

// Route to retrieve visas based on filters
// Example: GET /api/visas?visaStatus=valid&nationality=Canadian&gender=male
router.get("/", VisaController.getFilteredVisas);

// Route to retrieve all visas with pagination
// Example: GET /api/visas/all?page=1&limit=10
router.get("/all", VisaController.getAllVisas);

router.get("/visa-statistics", VisaController.getVisaStatistics);

router.get("/generateVisaId", VisaController.generateVisaId);

// Route to update a visa by user ID
router.patch("/:userId", VisaController.updateVisa);

// Route to retrieve a visa by user ID
router.get("/:userId", VisaController.getVisaByUserId);

module.exports = router;
