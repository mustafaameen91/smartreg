const NationalInfo = require("../models/nationalInfo.models.js");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   const nationalInfo = new NationalInfo({
      nationalNumber: req.body.nationalNumber,
      studentId: req.body.studentId,
      motherName: req.body.motherName,
      religion: req.body.religion,
   });

   NationalInfo.create(req.body, (err, data) => {
      if (err) res.status(err.code).send(err);
      else {
         res.send(data);
      }
   });
};

exports.findAll = (req, res) => {
   NationalInfo.getAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.findOne = (req, res) => {
   NationalInfo.findById(req.params.id, (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.createByFile = (req, res) => {
   NationalInfo.createFromFile((err, data) => {
      if (err) res.status(err.code).send(err);
      else {
         res.send(data);
      }
   });
};

exports.update = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   NationalInfo.updateById(
      req.params.id,
      new NationalInfo(req.body),
      (err, data) => {
         if (err) res.status(err.code).send(err);
         else res.send(data);
      }
   );
};

exports.delete = (req, res) => {
   NationalInfo.remove(req.params.id, (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send({ message: `NationalInfo was deleted successfully!` });
   });
};

exports.deleteAll = (req, res) => {
   NationalInfo.removeAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else
         res.send({ message: `All NationalInfos were deleted successfully!` });
   });
};
