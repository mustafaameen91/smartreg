const {
   prismaErrorHandling,
   prismaInstance,
} = require("../middleware/handleError.middleware.js");

const NationalityCertificate = function (nationalityCertificate) {
   this.nationalityNumber = nationalityCertificate.nationalityNumber;
   this.studentId = nationalityCertificate.studentId;
};

NationalityCertificate.create = async (newNationalityCertificate, result) => {
   try {
      let data = {
         nationalityNumber: newNationalityCertificate.nationalityNumber,
         studentId: newNationalityCertificate.studentId,
      };
      const nationalityCertificate =
         await prismaInstance.nationalityCertificate.upsert({
            where: {
               idNationalityCertificate:
                  newNationalityCertificate.idNationalityCertificate
                     ? parseInt(
                          newNationalityCertificate.idNationalityCertificate
                       )
                     : -1,
            },
            create: data,
            update: data,
         });

      result(null, nationalityCertificate);
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

NationalityCertificate.findById = async (nationalityCertificateId, result) => {
   try {
      const singleNationalityCertificate =
         await prismaInstance.nationalityCertificate.findUnique({
            where: {
               idNationalityCertificate: JSON.parse(nationalityCertificateId),
            },
         });

      if (singleNationalityCertificate) {
         result(null, singleNationalityCertificate);
      } else {
         result({
            error: "Not Found",
            code: 404,
            errorMessage: "Not Found Nationality Certificate with this Id",
         });
      }
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

NationalityCertificate.getAll = async (result) => {
   try {
      const nationalityCertificates =
         await prismaInstance.nationalityCertificate.findMany();
      result(null, nationalityCertificates);
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

NationalityCertificate.updateById = async (
   nationalityCertificateId,
   nationalityCertificate,
   result
) => {
   try {
      const updateNationalityCertificate =
         await prismaInstance.nationalityCertificate.update({
            where: {
               idNationalityCertificate: JSON.parse(nationalityCertificateId),
            },
            data: nationalityCertificate,
         });
      result(null, updateNationalityCertificate);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

NationalityCertificate.remove = async (id, result) => {
   try {
      const deleteNationalityCertificate =
         await prismaInstance.nationalityCertificate.delete({
            where: { idNationalityCertificate: JSON.parse(id) },
         });
      result(null, deleteNationalityCertificate);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

NationalityCertificate.removeAll = async (result) => {
   try {
      const deleteAllNationalityCertificates =
         await prismaInstance.nationalityCertificate.deleteMany({});
      result(null, deleteAllNationalityCertificates);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

module.exports = NationalityCertificate;
