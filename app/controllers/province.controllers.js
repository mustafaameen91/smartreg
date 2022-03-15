const Province = require("../models/province.models.js");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   const province = new Province({
      provinceName: req.body.provinceName,
      provinceNameEn: req.body.provinceNameEn,
   });

   Province.create(province, (err, data) => {
      if (err) res.status(err.code).send(err);
      else {
         res.send(data);
      }
   });
};

exports.findAll = (req, res) => {
   Province.getAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.findOne = (req, res) => {
   Province.findById(req.params.id, (err, data) => {
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

   Province.updateById(req.params.id, new Province(req.body), (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.delete = (req, res) => {
   Province.remove(req.params.id, (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send({ message: `Province was deleted successfully!` });
   });
};

exports.deleteAll = (req, res) => {
   Province.removeAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send({ message: `All Provinces were deleted successfully!` });
   });
};
