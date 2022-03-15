const OrderTitle = require("../models/orderTitle.models.js");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   const orderTitle = new OrderTitle({
      title: req.body.title,
      createdBy: req.body.createdBy,
   });

   OrderTitle.create(orderTitle, (err, data) => {
      if (err) res.status(err.code).send(err);
      else {
         res.send(data);
      }
   });
};

exports.findAll = (req, res) => {
   OrderTitle.getAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.findOne = (req, res) => {
   OrderTitle.findById(req.params.id, (err, data) => {
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

   OrderTitle.updateById(
      req.params.id,
      new OrderTitle(req.body),
      (err, data) => {
         if (err) res.status(err.code).send(err);
         else res.send(data);
      }
   );
};

exports.delete = (req, res) => {
   OrderTitle.remove(req.params.id, (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send({ message: `Order Title was deleted successfully!` });
   });
};

exports.deleteAll = (req, res) => {
   OrderTitle.removeAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send({ message: `All Order Titles were deleted successfully!` });
   });
};
