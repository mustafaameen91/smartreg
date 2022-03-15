const ImageType = require("../models/imageType.models.js");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   const imageType = new ImageType({
      typeName: req.body.typeName,
   });

   ImageType.create(imageType, (err, data) => {
      if (err) res.status(err.code).send(err);
      else {
         res.send(data);
      }
   });
};

exports.findAll = (req, res) => {
   ImageType.getAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.findOne = (req, res) => {
   ImageType.findById(req.params.id, (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.update = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   ImageType.updateById(req.params.id, new ImageType(req.body), (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.delete = (req, res) => {
   ImageType.remove(req.params.id, (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send({ message: `Image Type was deleted successfully!` });
   });
};

exports.deleteAll = (req, res) => {
   ImageType.removeAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send({ message: `All Image Type were deleted successfully!` });
   });
};
