const {
   prismaErrorHandling,
   prismaInstance,
} = require("./../middleware/handleError.middleware.js");

const ImageType = function (imageType) {
   this.typeName = imageType.typeName;
};

ImageType.create = async (newImageType, result) => {
   try {
      const imageType = await prismaInstance.imageType.create({
         data: newImageType,
      });

      result(null, imageType);
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

ImageType.findById = async (imageTypeId, result) => {
   try {
      const singleImageType = await prismaInstance.imageType.findUnique({
         where: {
            idImageType: JSON.parse(imageTypeId),
         },
      });

      if (singleImageType) {
         result(null, singleImageType);
      } else {
         result({
            error: "Not Found",
            code: 404,
            errorMessage: "Not Found Image Type with this Id",
         });
      }
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

ImageType.getAll = async (result) => {
   try {
      const imageTypes = await prismaInstance.imageType.findMany();
      result(null, imageTypes);
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

ImageType.updateById = async (imageTypeId, imageType, result) => {
   try {
      const updateImageType = await prismaInstance.imageType.update({
         where: { idImageType: JSON.parse(imageTypeId) },
         data: imageType,
      });
      result(null, updateImageType);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

ImageType.remove = async (id, result) => {
   try {
      const deleteImageType = await prismaInstance.imageType.delete({
         where: { idImageType: JSON.parse(id) },
      });
      result(null, deleteImageType);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

ImageType.removeAll = async (result) => {
   try {
      const deleteAllImageType = await prismaInstance.imageType.deleteMany({});
      result(null, deleteAllImageType);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

module.exports = ImageType;
