const StudentLevel = require("../models/studentLevel.models.js");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   const studentLevel = new StudentLevel({
      level: req.body.level,
      class: req.body.class,
      yearStudyId: req.body.yearStudyId,
      studentId: req.body.studentId,
   });

   StudentLevel.create(studentLevel, (err, data) => {
      if (err) res.status(err.code).send(err);
      else {
         res.send(data);
      }
   });
};

exports.findAll = (req, res) => {
   StudentLevel.getAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.createByFile = (req, res) => {
   StudentLevel.createFromFile((err, data) => {
      if (err) res.status(err.code).send(err);
      else {
         res.send(data);
      }
   });
};

exports.findOne = (req, res) => {
   StudentLevel.findById(req.params.id, (err, data) => {
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

   StudentLevel.updateById(
      req.params.id,
      new StudentLevel(req.body),
      (err, data) => {
         if (err) res.status(err.code).send(err);
         else res.send(data);
      }
   );
};

exports.delete = (req, res) => {
   StudentLevel.remove(req.params.id, (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send({ message: `StudentLevel was deleted successfully!` });
   });
};

exports.deleteAll = (req, res) => {
   StudentLevel.removeAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else
         res.send({ message: `All StudentLevels were deleted successfully!` });
   });
};
