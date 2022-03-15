const {
   prismaErrorHandling,
   prismaInstance,
} = require("./../middleware/handleError.middleware.js");

const StudentImage = function (studentImage) {
   this.imagePath = studentImage.imagePath;
   this.imageTypeId = studentImage.imageTypeId * 1;
   this.studentId = studentImage.studentId * 1;
};

StudentImage.create = async (newStudentImage, result) => {
   try {
      const studentImage = await prismaInstance.studentImage.create({
         data: newStudentImage,
      });

      result(null, studentImage);
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

StudentImage.createMany = async (newStudentImages, result) => {
   try {
      const studentImages = await prismaInstance.studentImage.createMany({
         data: newStudentImages,
      });

      result(null, studentImages);
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

StudentImage.findById = async (studentImageId, result) => {
   try {
      const singleStudentImage = await prismaInstance.studentImage.findUnique({
         where: {
            idStudentImage: JSON.parse(studentImageId),
         },
      });

      if (singleStudentImage) {
         result(null, singleStudentImage);
      } else {
         result({
            error: "Not Found",
            code: 404,
            errorMessage: "Not Found StudentImage with this Id",
         });
      }
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

StudentImage.getAll = async (result) => {
   try {
      const studentImages = await prismaInstance.studentImage.findMany();
      result(null, studentImages);
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

StudentImage.updateById = async (studentImageId, studentImage, result) => {
   try {
      const updateStudentImage = await prismaInstance.studentImage.update({
         where: { idStudentImage: JSON.parse(studentImageId) },
         data: studentImage,
      });
      result(null, updateStudentImage);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

StudentImage.remove = async (id, result) => {
   try {
      const deleteStudentImage = await prismaInstance.studentImage.delete({
         where: { idStudentImage: JSON.parse(id) },
      });
      result(null, deleteStudentImage);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

StudentImage.removeAll = async (result) => {
   try {
      const deleteAllStudentImages =
         await prismaInstance.studentImage.deleteMany({});
      result(null, deleteAllStudentImages);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

module.exports = StudentImage;
