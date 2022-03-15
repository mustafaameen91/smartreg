const Student = require("../models/student.models.js");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   Student.create(req.body, (err, data) => {
      if (err) res.status(err.code).send(err);
      else {
         res.send(data);
      }
   });
};

exports.createByFile = (req, res) => {
   Student.createFromFile((err, data) => {
      if (err) res.status(err.code).send(err);
      else {
         res.send(data);
      }
   });
};

exports.findBySearch = (req, res) => {
   let filtered = {};
   let exitCauseTitle = "";

   if (req.query.studentName) {
      filtered.studentName = req.query.studentName;
   }
   if (req.query.exitCauseTitle) {
      exitCauseTitle = req.query.exitCauseTitle;
   }

   if (req.query.sectionId) {
      filtered.sectionId = req.query.sectionId * 1;
   }

   if (req.query.studentId) {
      filtered.idStudent = req.query.studentId * 1;
   }

   if (req.query.registerYearId) {
      filtered.registerYearId = req.query.registerYearId * 1;
   }

   if (req.query.studentStatusId) {
      filtered.studentStatusId = req.query.studentStatusId * 1;
   }

   if (req.query.studentGraduation) {
      filtered.studentGraduation = req.query.studentGraduation * 1;
   }

   if (req.query.acceptedTypeId) {
      filtered.acceptedTypeId = req.query.acceptedTypeId * 1;
   }

   if (req.query.studentLevel) {
      filtered.studentLevel = req.query.studentLevel * 1;
   }

   if (req.query.studyType) {
      filtered.studyType = req.query.studyType == 1 ? true : false;
   }

   if (req.query.gender) {
      filtered.gender = req.query.gender == 1 ? true : false;
   }

   if (req.query.subCategoryId) {
      filtered.subCategoryId = req.query.subCategoryId * 1;
   }

   Student.getBySearch(filtered, exitCauseTitle, (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.findByMultiSearch = (req, res) => {
   let sectionData = JSON.parse(req.query.students);
   let sections = sectionData.map((section) => {
      return {
         sectionId: section.sectionId,
      };
   });

   Student.getByMultiSearch(sections, sectionData, (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.findStudentsCount = (req, res) => {
   let filtered = {};

   if (req.query.sectionId) {
      filtered.sectionId = req.query.sectionId * 1;
   }
   if (req.query.registerYearId) {
      filtered.registerYearId = req.query.registerYearId * 1;
   }

   if (req.query.studentStatusId) {
      filtered.studentStatusId = req.query.studentStatusId * 1;
   }

   if (req.query.acceptedTypeId) {
      filtered.acceptedTypeId = req.query.acceptedTypeId * 1;
   }

   if (req.query.studentLevel) {
      filtered.studentLevel = req.query.studentLevel * 1;
   }

   if (req.query.studyType) {
      filtered.studyType = req.query.studyType == 1 ? true : false;
   }

   Student.getStudentsCount(filtered, (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.findAll = (req, res) => {
   Student.getAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.findOne = (req, res) => {
   Student.findById(req.params.id, (err, data) => {
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

   Student.updateById(
      req.params.id,
      new Student(req.body),
      req.body,
      (err, data) => {
         if (err) res.status(err.code).send(err);
         else res.send(data);
      }
   );
};

exports.delete = (req, res) => {
   Student.remove(req.params.id, (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send({ message: `Student was deleted successfully!` });
   });
};

exports.deleteAll = (req, res) => {
   Student.removeAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send({ message: `All Students were deleted successfully!` });
   });
};
