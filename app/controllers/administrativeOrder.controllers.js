const AdministrativeOrder = require("../models/administrativeOrder.models.js");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   const administrativeOrder = new AdministrativeOrder({
      orderTitleId: req.body.orderTitleId,
      orderNumber: req.body.orderNumber,
      orderDescription: req.body.orderDescription,
      orderYear: req.body.orderYear,
      orderLevel: req.body.orderLevel,
      studentId: req.body.studentId,
      orderDate: new Date(req.body.orderDate),
      createdBy: req.body.createdBy,
   });

   AdministrativeOrder.create(
      administrativeOrder,
      req.body.studentStatusId,
      (err, data) => {
         if (err) res.status(err.code).send(err);
         else {
            res.send(data);
         }
      }
   );
};

exports.createMany = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   AdministrativeOrder.createManyOrders(req.body, (err, data) => {
      if (err) res.status(err.code).send(err);
      else {
         res.send(data);
      }
   });
};

exports.createManyUpgrade = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   AdministrativeOrder.createManyOrdersUpgrade(req.body, (err, data) => {
      if (err) res.status(err.code).send(err);
      else {
         res.send(data);
      }
   });
};

exports.removeByFile = (req, res) => {
   AdministrativeOrder.removeAllByFile(req.query.fileName, (err, data) => {
      if (err) res.status(err.code).send(err);
      else {
         res.send(data);
      }
   });
};

exports.createByFile = (req, res) => {
   AdministrativeOrder.createFromFile(req.query, (err, data) => {
      if (err) res.status(err.code).send(err);
      else {
         res.send(data);
      }
   });
};

exports.findAllWithCount = (req, res) => {
   AdministrativeOrder.getAllWithCount((err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.findAll = (req, res) => {
   AdministrativeOrder.getAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.findOne = (req, res) => {
   AdministrativeOrder.findById(req.params.id, (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.findOneByStudentId = (req, res) => {
   AdministrativeOrder.findByStudentId(req.params.id, (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.findByFilter = (req, res) => {
   let filtered = {};

   if (req.query.sectionId) {
      filtered.sectionId = req.query.sectionId * 1;
   }

   if (req.query.studentId) {
      filtered.studentId = req.query.studentId * 1;
   }

   if (req.query.orderTitleId) {
      filtered.orderTitleId = req.query.orderTitleId * 1;
   }

   if (req.query.studentStatusId) {
      filtered.studentStatusId = req.query.studentStatusId * 1;
   }

   if (req.query.gender) {
      filtered.gender = req.query.gender == 1 ? true : false;
   }

   if (req.query.orderNumber) {
      filtered.orderNumber = req.query.orderNumber;
   }

   if (req.query.studentLevel) {
      filtered.studentLevel = req.query.studentLevel * 1;
   }

   if (req.query.orderYear) {
      filtered.orderYear = req.query.orderYear * 1;
   }

   if (req.query.orderLevel) {
      filtered.orderLevel = req.query.orderLevel * 1;
   }

   if (req.query.registerYearId) {
      filtered.registerYearId = req.query.registerYearId * 1;
   }

   if (req.query.exitCauseTitle) {
      filtered.exitCauseTitle = req.query.exitCauseTitle;
   }

   if (req.query.studySubCategoryId) {
      filtered.studySubCategoryId = req.query.studySubCategoryId * 1;
   }

   if (req.query.studentGraduation) {
      filtered.studentGraduation = req.query.studentGraduation * 1;
   }

   if (req.query.orderDate) {
      var startDate = new Date(req.query.orderDate);
      var day = 60 * 60 * 24 * 1000;
      var endDate = new Date(startDate.getTime() + day);

      filtered.orderDate = {
         lte: endDate.toISOString(),
         gte: startDate.toISOString(),
      };
   }

   if (req.query.studyType) {
      filtered.studyType = req.query.studyType == 1 ? true : false;
   }

   AdministrativeOrder.getByFilter(filtered, (err, data) => {
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
   console.log(req.body);
   AdministrativeOrder.updateManyOrder(req.body, (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.updateByMultipleId = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   AdministrativeOrder.updateByIdsMultiple(req.body, (err, data) => {
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

   AdministrativeOrder.updateById(req.params.id, req.body, (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.delete = (req, res) => {
   AdministrativeOrder.remove(req.params.id, (err, data) => {
      if (err) res.status(err.code).send(err);
      else
         res.send({
            message: `administrative Order was deleted successfully!`,
         });
   });
};

exports.deleteAll = (req, res) => {
   let parsedData = JSON.parse(req.query.orderIds);
   AdministrativeOrder.removeAll(parsedData, (err, data) => {
      if (err) res.status(err.code).send(err);
      else
         res.send({
            message: `All administrative Orders were deleted successfully!`,
         });
   });
};

exports.deleteAllByOrderNumber = (req, res) => {
   AdministrativeOrder.removeAllByOrderNumber(
      req.query.orderNumber,
      req.query.orderYear * 1,
      (err, data) => {
         if (err) res.status(err.code).send(err);
         else
            res.send({
               message: `All administrative Orders were deleted successfully!`,
            });
      }
   );
};
