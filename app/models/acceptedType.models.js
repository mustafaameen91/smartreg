const {
   prismaErrorHandling,
   prismaInstance,
} = require("./../middleware/handleError.middleware.js");

const AcceptedType = function (acceptedType) {
   this.acceptedName = acceptedType.acceptedName;
};

AcceptedType.create = async (newAcceptedType, result) => {
   try {
      const acceptedType = await prismaInstance.acceptedType.create({
         data: newAcceptedType,
      });

      result(null, acceptedType);
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

AcceptedType.findById = async (acceptedTypeId, result) => {
   try {
      const singleAcceptedType = await prismaInstance.acceptedType.findUnique({
         where: {
            idAcceptedType: JSON.parse(acceptedTypeId),
         },
      });

      if (singleAcceptedType) {
         result(null, singleAcceptedType);
      } else {
         result({
            error: "Not Found",
            code: 404,
            errorMessage: "Not Found Accepted Type with this Id",
         });
      }
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

AcceptedType.getAll = async (result) => {
   try {
      const acceptedTypes = await prismaInstance.acceptedType.findMany();
      result(null, acceptedTypes);
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

AcceptedType.updateById = async (acceptedTypeId, acceptedType, result) => {
   try {
      const updateAcceptedType = await prismaInstance.acceptedType.update({
         where: { idAcceptedType: JSON.parse(acceptedTypeId) },
         data: acceptedType,
      });
      result(null, updateAcceptedType);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

AcceptedType.remove = async (id, result) => {
   try {
      const deleteAcceptedType = await prismaInstance.acceptedType.delete({
         where: { idAcceptedType: JSON.parse(id) },
      });
      result(null, deleteAcceptedType);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

AcceptedType.removeAll = async (result) => {
   try {
      const deleteAllAcceptedTypes =
         await prismaInstance.acceptedType.deleteMany({});
      result(null, deleteAllAcceptedTypes);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

module.exports = AcceptedType;
