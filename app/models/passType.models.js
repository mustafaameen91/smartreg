const {
   prismaErrorHandling,
   prismaInstance,
} = require("./../middleware/handleError.middleware.js");

const PassType = function (passType) {
   this.passName = passType.passName;
   this.createdBy = passType.createdBy;
};

PassType.create = async (newPassType, result) => {
   try {
      const passType = await prismaInstance.passType.createMany({
         data: newPassType,
      });

      result(null, passType);
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

PassType.findById = async (passTypeId, result) => {
   try {
      const singlePassType = await prismaInstance.passType.findUnique({
         where: {
            idPassType: JSON.parse(passTypeId),
         },
      });

      if (singlePassType) {
         result(null, singlePassType);
      } else {
         result({
            error: "Not Found",
            code: 404,
            errorMessage: "Not Found Pass Type with this Id",
         });
      }
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

PassType.getAll = async (result) => {
   try {
      const passTypes = await prismaInstance.passType.findMany();
      result(null, passTypes);
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

PassType.updateById = async (passTypeId, passType, result) => {
   try {
      const updatePassType = await prismaInstance.passType.update({
         where: { idPassType: JSON.parse(passTypeId) },
         data: passType,
      });
      result(null, updatePassType);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

PassType.remove = async (id, result) => {
   try {
      const deletePassType = await prismaInstance.passType.delete({
         where: { idPassType: JSON.parse(id) },
      });
      result(null, deletePassType);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

PassType.removeAll = async (result) => {
   try {
      const deleteAllPassTypes = await prismaInstance.passType.deleteMany({});
      result(null, deleteAllPassTypes);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

module.exports = PassType;
