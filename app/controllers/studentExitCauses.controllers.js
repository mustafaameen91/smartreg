const StudentExitCauses = require("../models/studentExitCauses.models.js");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   const studentExitCauses = new StudentExitCauses({
      sectionName: req.body.sectionName,
      code: req.body.code,
      englishName: req.body.englishName,
   });

   StudentExitCauses.create(studentExitCauses, (err, data) => {
      if (err) res.status(err.code).send(err);
      else {
         res.send(data);
      }
   });
};

exports.findAll = (req, res) => {
   StudentExitCauses.getAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.findOne = (req, res) => {
   StudentExitCauses.findById(req.params.id, (err, data) => {
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

   StudentExitCauses.updateById(
      req.params.id,
      new StudentExitCauses(req.body),
      (err, data) => {
         if (err) res.status(err.code).send(err);
         else res.send(data);
      }
   );
};

exports.delete = (req, res) => {
   StudentExitCauses.remove(req.params.id, (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send({ message: `StudentExitCauses was deleted successfully!` });
   });
};

exports.deleteAll = (req, res) => {
   StudentExitCauses.removeAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else
         res.send({
            message: `All StudentExitCauses were deleted successfully!`,
         });
   });
};
