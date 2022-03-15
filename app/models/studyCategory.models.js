const {
   prismaErrorHandling,
   prismaInstance,
} = require("./../middleware/handleError.middleware.js");

const StudyCategory = function (studyCategory) {
   this.categoryName = studyCategory.categoryName;
};

StudyCategory.create = async (newStudyCategory, result) => {
   try {
      const studyCategory = await prismaInstance.studyCategory.create({
         data: newStudyCategory,
      });

      result(null, studyCategory);
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

StudyCategory.findById = async (studyCategoryId, result) => {
   try {
      const singleStudyCategory = await prismaInstance.studyCategory.findUnique(
         {
            where: {
               idStudyCategory: JSON.parse(studyCategoryId),
            },
         }
      );

      if (singleStudyCategory) {
         result(null, singleStudyCategory);
      } else {
         result({
            error: "Not Found",
            code: 404,
            errorMessage: "Not Found Study Category with this Id",
         });
      }
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

StudyCategory.getAll = async (result) => {
   try {
      const studyCategories = await prismaInstance.studyCategory.findMany({
         include: {
            StudySubCategory: true,
         },
      });
      result(null, studyCategories);
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

StudyCategory.updateById = async (studyCategoryId, studyCategory, result) => {
   try {
      const updateStudyCategory = await prismaInstance.studyCategory.update({
         where: { idStudyCategory: JSON.parse(studyCategoryId) },
         data: studyCategory,
      });
      result(null, updateStudyCategory);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

StudyCategory.remove = async (id, result) => {
   try {
      const deleteStudyCategory = await prismaInstance.studyCategory.delete({
         where: { idStudyCategory: JSON.parse(id) },
      });
      result(null, deleteStudyCategory);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

StudyCategory.removeAll = async (result) => {
   try {
      const deleteAllStudyCategories =
         await prismaInstance.studyCategory.deleteMany({});
      result(null, deleteAllStudyCategories);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

module.exports = StudyCategory;
