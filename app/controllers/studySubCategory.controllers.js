const StudySubCategory = require("../models/studySubCategory.models.js");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   const studySubCategory = new StudySubCategory({
      subCategoryName: req.body.subCategoryName,
      studyCategoryId: req.body.studyCategoryId,
   });

   StudySubCategory.create(studySubCategory, (err, data) => {
      if (err) res.status(err.code).send(err);
      else {
         res.send(data);
      }
   });
};

exports.findAll = (req, res) => {
   StudySubCategory.getAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.findOne = (req, res) => {
   StudySubCategory.findById(req.params.id, (err, data) => {
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

   StudySubCategory.updateById(
      req.params.id,
      new StudySubCategory(req.body),
      (err, data) => {
         if (err) res.status(err.code).send(err);
         else res.send(data);
      }
   );
};

exports.delete = (req, res) => {
   StudySubCategory.remove(req.params.id, (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send({ message: `StudySubCategory was deleted successfully!` });
   });
};

exports.deleteAll = (req, res) => {
   StudySubCategory.removeAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else
         res.send({
            message: `All StudySubCategories were deleted successfully!`,
         });
   });
};
