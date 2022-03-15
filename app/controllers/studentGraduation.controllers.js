const StudentGraduation = require("../models/studentGraduation.models.js");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   const studentGraduation = new StudentGraduation({
      graduationDate: req.body.graduationDate,
      studentId: req.body.studentId,
   });

   StudentGraduation.create(studentGraduation, (err, data) => {
      if (err) res.status(err.code).send(err);
      else {
         res.send(data);
      }
   });
};
exports.createByFile = (req, res) => {
   StudentGraduation.createFromFile((err, data) => {
      if (err) res.status(err.code).send(err);
      else {
         res.send(data);
      }
   });
};

exports.findAll = (req, res) => {
   StudentGraduation.getAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.createByFile = (req, res) => {
   StudentGraduation.createFromFile((err, data) => {
      if (err) res.status(err.code).send(err);
      else {
         res.send(data);
      }
   });
};

exports.findOne = (req, res) => {
   StudentGraduation.findById(req.params.id, (err, data) => {
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

   StudentGraduation.updateById(
      req.params.id,
      new StudentGraduation(req.body),
      (err, data) => {
         if (err) res.status(err.code).send(err);
         else res.send(data);
      }
   );
};

exports.delete = (req, res) => {
   StudentGraduation.remove(req.params.id, (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send({ message: `StudentGraduation was deleted successfully!` });
   });
};

exports.deleteAll = (req, res) => {
   StudentGraduation.removeAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else
         res.send({
            message: `All StudentGraduations were deleted successfully!`,
         });
   });
};
