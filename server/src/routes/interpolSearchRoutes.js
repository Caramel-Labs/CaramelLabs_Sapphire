const express = require("express");
const router = express.Router();
const {
  getRedNotices,
  getYellowNotices,
  getUnNotices,
  getAllNotices,
  searchNotices,
} = require("../controllers/interpolSearchController");

router.get("/red-notices", getRedNotices);
router.get("/yellow-notices", getYellowNotices);
router.get("/un-notices", getUnNotices);

router.get("/all", getAllNotices);
router.get("/search", searchNotices);

module.exports = router;
