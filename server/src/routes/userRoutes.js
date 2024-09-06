const express = require("express");
const UserController = require("../controllers/userContrllers");

const router = express.Router();

router.post("/", UserController.createUser);
router.patch("/:userId", UserController.updateUser);
router.get("/:userId", UserController.getUserById);
router.patch("/add-experience", UserController.addUserExperience);
router.patch("/add-visited-place", UserController.addUserVisitedPlaces);

module.exports = router;
