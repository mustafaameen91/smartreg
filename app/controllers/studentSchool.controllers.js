const StudentSchool = require("../models/studentSchool.models.js");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   const studentSchool = new StudentSchool({
      schoolName: req.body.schoolName,
      graduationDate: req.body.graduationDate,
      documentDate: req.body.documentDate,
      totalMarks: parseInt(req.body.totalMarks) * 1,
      average: req.body.average * 1,
      documentNumber: parseInt(req.body.documentNumber) * 1,
      documentDate: req.body.documentDate,
      lessonCount: parseInt(req.body.lessonCount) * 1,
      directorate: req.body.directorate,
      studySubCategoryId: req.body.studySubCategoryId,
      studentId: parseInt(req.body.studentId) * 1,
      passTypeId: req.body.passTypeId * 1,
      documentDigit: parseInt(req.body.documentDigit) * 1,
      examNumber: req.body.examNumber,
      certificateStatusId: req.body.certificateStatusId,
      certificateStatusDescription: req.body.certificateStatusDescription,
   });

   StudentSchool.create(req.body, (err, data) => {
      if (err) res.status(err.code).send(err);
      else {
         res.send(data);
      }
   });
};

exports.findAll = (req, res) => {
   StudentSchool.getAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.createByFile = (req, res) => {
   StudentSchool.createFromFile((err, data) => {
      if (err) res.status(err.code).send(err);
      else {
         res.send(data);
      }
   });
};

exports.findOne = (req, res) => {
   StudentSchool.findById(req.params.id, (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.updateMany = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   StudentSchool.updateManyByIds(req.body, (err, data) => {
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

   StudentSchool.updateById(
      req.params.id,
      new StudentSchool(req.body),
      (err, data) => {
         if (err) res.status(err.code).send(err);
         else res.send(data);
      }
   );
};

exports.delete = (req, res) => {
   StudentSchool.remove(req.params.id, (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send({ message: `StudentSchool was deleted successfully!` });
   });
};

exports.deleteAll = (req, res) => {
   StudentSchool.removeAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else
         res.send({ message: `All StudentSchools were deleted successfully!` });
   });
};
