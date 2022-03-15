const StudentImage = require("../models/studentImage.models.js");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   const studentImage = new StudentImage({
      imagePath: req.body.imagePath,
      imageTypeId: req.body.imageTypeId * 1,
      studentId: req.body.studentId * 1,
   });

   StudentImage.create(studentImage, (err, data) => {
      if (err) res.status(err.code).send(err);
      else {
         res.send(data);
      }
   });
};

exports.createMany = (req, res) => {
   console.log(req.body);
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   StudentImage.createMany(req.body, (err, data) => {
      if (err) res.status(err.code).send(err);
      else {
         res.send(data);
      }
   });
};

exports.findAll = (req, res) => {
   StudentImage.getAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.findOne = (req, res) => {
   StudentImage.findById(req.params.id, (err, data) => {
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

   StudentImage.updateById(
      req.params.id,
      new StudentImage(req.body),
      (err, data) => {
         if (err) res.status(err.code).send(err);
         else res.send(data);
      }
   );
};

exports.delete = (req, res) => {
   StudentImage.remove(req.params.id, (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send({ message: `StudentImage was deleted successfully!` });
   });
};

exports.deleteAll = (req, res) => {
   StudentImage.removeAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else
         res.send({ message: `All StudentImages were deleted successfully!` });
   });
};
