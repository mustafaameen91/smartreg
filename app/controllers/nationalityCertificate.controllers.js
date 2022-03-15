const NationalityCertificate = require("../models/nationalityCertificate.models.js");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   const nationalityCertificate = new NationalityCertificate({
      nationalityNumber: req.body.nationalityNumber,
      studentId: req.body.studentId,
   });

   NationalityCertificate.create(req.body, (err, data) => {
      if (err) res.status(err.code).send(err);
      else {
         res.send(data);
      }
   });
};

exports.findAll = (req, res) => {
   NationalityCertificate.getAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.findOne = (req, res) => {
   NationalityCertificate.findById(req.params.id, (err, data) => {
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

   NationalityCertificate.updateById(
      req.params.id,
      new User(req.body),
      (err, data) => {
         if (err) res.status(err.code).send(err);
         else res.send(data);
      }
   );
};

exports.delete = (req, res) => {
   NationalityCertificate.remove(req.params.id, (err, data) => {
      if (err) res.status(err.code).send(err);
      else
         res.send({
            message: `Nationality Certificate was deleted successfully!`,
         });
   });
};

exports.deleteAll = (req, res) => {
   NationalityCertificate.removeAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else
         res.send({
            message: `All Nationality Certificates were deleted successfully!`,
         });
   });
};
