const express = require("express");
const router = express.Router();
const {
  getShrines,
  getShrine,
  createShrine,
  updateShrine,
  deleteShrine,
  getShrineStats,
} = require("../controllers/shrineController");
const { shrineValidationRules, validate } = require("../middleware/validation");

// Statistics route (before /:id to avoid conflict)
router.get("/stats", getShrineStats);

// Main CRUD routes
router
  .route("/")
  .get(getShrines)
  .post(shrineValidationRules(), validate, createShrine);

router.route("/:id").get(getShrine).put(updateShrine).delete(deleteShrine);

module.exports = router;
