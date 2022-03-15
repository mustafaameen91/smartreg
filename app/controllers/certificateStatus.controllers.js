const CertificateStatus = require("../models/certificateStatus.models.js");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   const certificateStatus = new CertificateStatus({
      certificateStatusName: req.body.certificateStatusName,
   });

   CertificateStatus.create(certificateStatus, (err, data) => {
      if (err) res.status(err.code).send(err);
      else {
         res.send(data);
      }
   });
};

exports.findAll = (req, res) => {
   CertificateStatus.getAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.findOne = (req, res) => {
   CertificateStatus.findById(req.params.id, (err, data) => {
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

   CertificateStatus.updateById(
      req.params.id,
      new CertificateStatus(req.body),
      (err, data) => {
         if (err) res.status(err.code).send(err);
         else res.send(data);
      }
   );
};

exports.delete = (req, res) => {
   CertificateStatus.remove(req.params.id, (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send({ message: `CertificateStatus was deleted successfully!` });
   });
};

exports.deleteAll = (req, res) => {
   CertificateStatus.removeAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else
         res.send({
            message: `All CertificatesStatus were deleted successfully!`,
         });
   });
};
