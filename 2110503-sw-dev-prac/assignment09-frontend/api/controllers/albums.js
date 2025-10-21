const Album = require("../models/Album");

exports.getAlbums = async (req, res, next) => {
  Album.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving All Albums",
      });
    else res.status(200).json(data);
  });
};

exports.getAlbum = (req, res) => {
  Album.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.msg === "not_found") {
        res.status(404).send({
          message: `Not found Album with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Album with id " + req.params.id,
        });
      }
    } else res.status(200).json(data);
  });
};

exports.createAlbum = async (req, res, next) => {
  if (!req.body) {
    res.status(400).json({
      success: false,
      msg: "Content cannot be empty!",
    });
  }

  const album = new Album({
    title: req.body.title,
    artist: req.body.artist,
    price: req.body.price,
  });

  Album.create(album, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating an Album",
      });
    else res.status(201).json(data);
  });
};

exports.updateAlbum = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  console.log(req.body);
  Album.updateById(req.params.id, new Album(req.body), (err, data) => {
    if (err) {
      if (err.msg === "not_found") {
        res.status(404).send({
          message: `Not found Album with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Album with id " + req.params.id,
        });
      }
    } else res.status(200).json(data);
  });
};

exports.deleteAlbum = (req, res) => {
  Album.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.msg === "not_found") {
        res.status(404).send({
          message: `Not found Album with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Album with id " + req.params.id,
        });
      }
    } else res.status(200).json({ success: true, data: {} });
  });
};
