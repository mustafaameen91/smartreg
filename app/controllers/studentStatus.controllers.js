const StudentStatus = require("../models/studentStatus.models.js");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   const studentStatus = new StudentStatus({
      statusName: req.body.statusName,
   });

   StudentStatus.create(studentStatus, (err, data) => {
      if (err) res.status(err.code).send(err);
      else {
         res.send(data);
      }
   });
};

exports.findAll = (req, res) => {
   StudentStatus.getAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.findOne = (req, res) => {
   StudentStatus.findById(req.params.id, (err, data) => {
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

   StudentStatus.updateById(
      req.params.id,
      new StudentStatus(req.body),
      (err, data) => {
         if (err) res.status(err.code).send(err);
         else res.send(data);
      }
   );
};

exports.delete = (req, res) => {
   StudentStatus.remove(req.params.id, (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send({ message: `StudentsStatus was deleted successfully!` });
   });
};

exports.deleteAll = (req, res) => {
   StudentStatus.removeAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else
         res.send({ message: `All StudentsStatus were deleted successfully!` });
   });
};
