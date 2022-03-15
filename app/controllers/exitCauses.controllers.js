const ExitCauses = require("../models/exitCauses.models.js");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   const exitCauses = new ExitCauses({
      exitCausesTitle: req.body.exitCausesTitle,
      studentId: req.body.studentId,
      createdBy: req.body.createdBy,
   });

   ExitCauses.create(exitCauses, (err, data) => {
      if (err) res.status(err.code).send(err);
      else {
         res.send(data);
      }
   });
};

exports.createMany = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   ExitCauses.createMany(req.body, (err, data) => {
      if (err) res.status(err.code).send(err);
      else {
         res.send(data);
      }
   });
};

exports.findAll = (req, res) => {
   ExitCauses.getAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.findOne = (req, res) => {
   ExitCauses.findById(req.params.id, (err, data) => {
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

   ExitCauses.updateById(
      req.params.id,
      new ExitCauses(req.body),
      (err, data) => {
         if (err) res.status(err.code).send(err);
         else res.send(data);
      }
   );
};

exports.delete = (req, res) => {
   ExitCauses.remove(req.params.id, (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send({ message: `Exit Causes was deleted successfully!` });
   });
};

exports.deleteAll = (req, res) => {
   ExitCauses.removeAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send({ message: `All Exit Causes were deleted successfully!` });
   });
};
