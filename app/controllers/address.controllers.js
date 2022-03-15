const Address = require("../models/address.models.js");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   const address = new Address({
      provinceId: req.body.provinceId,
      district: req.body.district,
      avenue: req.body.avenue,
      houseNumber: req.body.houseNumber,
      streetNumber: req.body.streetNumber,
      studentId: req.body.studentId * 1,
   });

   Address.create(req.body, (err, data) => {
      if (err) res.status(err.code).send(err);
      else {
         res.send(data);
      }
   });
};

exports.findAll = (req, res) => {
   Address.getAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.findOne = (req, res) => {
   Address.findById(req.params.id, (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.createByFile = (req, res) => {
   Address.createFromFile((err, data) => {
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

   Address.updateById(req.params.id, new Address(req.body), (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.delete = (req, res) => {
   Address.remove(req.params.id, (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send({ message: `Address was deleted successfully!` });
   });
};

exports.deleteAll = (req, res) => {
   Address.removeAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send({ message: `All Addresses were deleted successfully!` });
   });
};
