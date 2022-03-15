const AcceptedType = require("../models/acceptedType.models.js");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   const acceptedType = new AcceptedType({
      acceptedName: req.body.acceptedName,
   });

   AcceptedType.create(acceptedType, (err, data) => {
      if (err) res.status(err.code).send(err);
      else {
         res.send(data);
      }
   });
};

exports.findAll = (req, res) => {
   AcceptedType.getAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.findOne = (req, res) => {
   AcceptedType.findById(req.params.id, (err, data) => {
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

   AcceptedType.updateById(
      req.params.id,
      new AcceptedType(req.body),
      (err, data) => {
         if (err) res.status(err.code).send(err);
         else res.send(data);
      }
   );
};

exports.delete = (req, res) => {
   AcceptedType.remove(req.params.id, (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send({ message: `AcceptedType was deleted successfully!` });
   });
};

exports.deleteAll = (req, res) => {
   AcceptedType.removeAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else
         res.send({ message: `All AcceptedTypes were deleted successfully!` });
   });
};
