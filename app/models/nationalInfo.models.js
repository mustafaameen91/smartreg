const {
   prismaErrorHandling,
   prismaInstance,
} = require("./../middleware/handleError.middleware.js");
const fs = require("fs");

const NationalInfo = function (nationalInfo) {
   this.nationalNumber = nationalInfo.nationalNumber;
   this.studentId = nationalInfo.studentId;
   this.motherName = nationalInfo.motherName;
   this.religion = nationalInfo.religion;
};

NationalInfo.create = async (newNationalInfo, result) => {
   let data = {
      nationalNumber: newNationalInfo.nationalNumber,
      studentId: newNationalInfo.studentId,
      motherName: newNationalInfo.motherName,
      religion: newNationalInfo.religion,
   };
   try {
      const nationalInfo = await prismaInstance.nationalInfo.upsert({
         where: {
            idNationalInfo: newNationalInfo.idNationalInfo
               ? parseInt(newNationalInfo.idNationalInfo)
               : -1,
         },
         update: data,
         create: data,
      });

      result(null, nationalInfo);
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

NationalInfo.findById = async (nationalInfoId, result) => {
   try {
      const singleNationalInfo = await prismaInstance.nationalInfo.findUnique({
         where: {
            idNationalInfo: JSON.parse(nationalInfoId),
         },
      });

      if (singleNationalInfo) {
         result(null, singleNationalInfo);
      } else {
         result({
            error: "Not Found",
            code: 404,
            errorMessage: "Not Found nationalInfo with this Id",
         });
      }
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

NationalInfo.getAll = async (result) => {
   try {
      const nationalInfos = await prismaInstance.nationalInfo.findMany();
      result(null, nationalInfos);
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

NationalInfo.createFromFile = async (result) => {
   let data = JSON.parse(
      fs.readFileSync(__dirname + "/studentsNationalInfo.txt", "utf-8")
   );

   if (data.length > 0) {
      try {
         const section = await prismaInstance.nationalInfo.createMany({
            data: data,
         });

         result(null, section);
      } catch (err) {
         console.log(prismaErrorHandling(err));
         result(prismaErrorHandling(err), null);
      }
   } else {
      result(null, { message: "notValid" });
   }
};

NationalInfo.updateById = async (nationalInfoId, nationalInfo, result) => {
   try {
      const updateNationalInfo = await prismaInstance.nationalInfo.update({
         where: { idNationalInfo: JSON.parse(nationalInfoId) },
         data: nationalInfo,
      });
      result(null, updateNationalInfo);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

NationalInfo.remove = async (id, result) => {
   try {
      const deleteNationalInfo = await prismaInstance.nationalInfo.delete({
         where: { idNationalInfo: JSON.parse(id) },
      });
      result(null, deleteNationalInfo);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

NationalInfo.removeAll = async (result) => {
   try {
      const deleteAllNationalInfo =
         await prismaInstance.nationalInfo.deleteMany({});
      result(null, deleteAllNationalInfo);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

module.exports = NationalInfo;
