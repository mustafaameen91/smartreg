const {
   prismaErrorHandling,
   prismaInstance,
} = require("./../middleware/handleError.middleware.js");

const StudySubCategory = function (studySubCategory) {
   this.subCategoryName = studySubCategory.subCategoryName;
   this.studyCategoryId = studySubCategory.studyCategoryId;
};

StudySubCategory.create = async (newStudySubCategory, result) => {
   try {
      const studySubCategory = await prismaInstance.studySubCategory.create({
         data: newStudySubCategory,
      });

      result(null, studySubCategory);
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

StudySubCategory.findById = async (studySubCategoryId, result) => {
   try {
      const singleStudySubCategory =
         await prismaInstance.studySubCategory.findUnique({
            where: {
               idStudySubCategory: JSON.parse(studySubCategoryId),
            },
         });

      if (singleStudySubCategory) {
         result(null, singleStudySubCategory);
      } else {
         result({
            error: "Not Found",
            code: 404,
            errorMessage: "Not Found Study Sub Category with this Id",
         });
      }
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

StudySubCategory.getAll = async (result) => {
   try {
      const studySubCategories =
         await prismaInstance.studySubCategory.findMany();
      result(null, studySubCategories);
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

StudySubCategory.updateById = async (
   studySubCategoryId,
   studySubCategory,
   result
) => {
   try {
      const updateStudySubCategory =
         await prismaInstance.studySubCategory.update({
            where: { idStudySubCategory: JSON.parse(studySubCategoryId) },
            data: studySubCategory,
         });
      result(null, updateStudySubCategory);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

StudySubCategory.remove = async (id, result) => {
   try {
      const deleteStudySubCategory =
         await prismaInstance.studySubCategory.delete({
            where: { idStudySubCategory: JSON.parse(id) },
         });
      result(null, deleteStudySubCategory);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

StudySubCategory.removeAll = async (result) => {
   try {
      const deleteAllStudySubCategory =
         await prismaInstance.studySubCategory.deleteMany({});
      result(null, deleteAllStudySubCategory);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

module.exports = StudySubCategory;
