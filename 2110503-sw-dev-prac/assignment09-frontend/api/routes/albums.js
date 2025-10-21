const express = require("express");
const {
  getAlbum,
  getAlbums,
  createAlbum,
  updateAlbum,
  deleteAlbum,
} = require("../controllers/albums");

const router = express.Router();

router.route("/").get(getAlbums).post(createAlbum);
router.route("/:id").get(getAlbum).put(updateAlbum).delete(deleteAlbum);

module.exports = router;
