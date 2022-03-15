const {
   prismaErrorHandling,
   prismaInstance,
} = require("./../middleware/handleError.middleware.js");

const CertificateStatus = function (certificateStatus) {
   this.certificateStatusName = certificateStatus.certificateStatusName;
};

CertificateStatus.create = async (newCertificateStatus, result) => {
   try {
      const certificateStatus = await prismaInstance.certificateStatus.create({
         data: newCertificateStatus,
      });

      result(null, certificateStatus);
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

CertificateStatus.findById = async (certificateStatusId, result) => {
   try {
      const singleCertificateStatus =
         await prismaInstance.certificateStatus.findUnique({
            where: {
               idCertificateStatus: JSON.parse(certificateStatusId),
            },
         });

      if (singleCertificateStatus) {
         result(null, singleCertificateStatus);
      } else {
         result({
            error: "Not Found",
            code: 404,
            errorMessage: "Not Found Certificate Status with this Id",
         });
      }
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

CertificateStatus.getAll = async (result) => {
   try {
      const certificatesStatus =
         await prismaInstance.certificateStatus.findMany();
      result(null, certificatesStatus);
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

CertificateStatus.updateById = async (
   certificateStatusId,
   certificateStatus,
   result
) => {
   try {
      const updateCertificateStatus =
         await prismaInstance.certificateStatus.update({
            where: { idCertificateStatus: JSON.parse(certificateStatusId) },
            data: certificateStatus,
         });
      result(null, updateCertificateStatus);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

CertificateStatus.remove = async (id, result) => {
   try {
      const deleteCertificateStatus =
         await prismaInstance.certificateStatus.delete({
            where: { idCertificateStatus: JSON.parse(id) },
         });
      result(null, deleteCertificateStatus);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

CertificateStatus.removeAll = async (result) => {
   try {
      const deleteAllCertificateStatus =
         await prismaInstance.certificateStatus.deleteMany({});
      result(null, deleteAllCertificateStatus);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

module.exports = CertificateStatus;
