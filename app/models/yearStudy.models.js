const {
   prismaErrorHandling,
   prismaInstance,
} = require("./../middleware/handleError.middleware.js");

const YearStudy = function (yearStudy) {
   this.year = yearStudy.year;
   this.currentYear = yearStudy.currentYear;
};

YearStudy.create = async (newYearStudy, result) => {
   try {
      const yearStudy = await prismaInstance.yearStudy.create({
         data: newYearStudy,
      });

      result(null, yearStudy);
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

YearStudy.findById = async (yearStudyId, result) => {
   try {
      const singleYearStudy = await prismaInstance.yearStudy.findUnique({
         where: {
            idYearStudy: JSON.parse(yearStudyId),
         },
      });

      if (singleYearStudy) {
         result(null, singleYearStudy);
      } else {
         result({
            error: "Not Found",
            code: 404,
            errorMessage: "Not Found YearStudy with this Id",
         });
      }
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

YearStudy.getAll = async (result) => {
   try {
      const yearStudies = await prismaInstance.yearStudy.findMany();
      result(null, yearStudies);
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

YearStudy.updateById = async (yearStudyId, yearStudy, result) => {
   try {
      const updateYearStudy = await prismaInstance.yearStudy.update({
         where: { idYearStudy: JSON.parse(yearStudyId) },
         data: yearStudy,
      });
      result(null, updateYearStudy);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

YearStudy.remove = async (id, result) => {
   try {
      const deleteYearStudy = await prismaInstance.yearStudy.delete({
         where: { idYearStudy: JSON.parse(id) },
      });
      result(null, deleteYearStudy);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

YearStudy.removeAll = async (result) => {
   try {
      const deleteAllYearStudy = await prismaInstance.yearStudy.deleteMany({});
      result(null, deleteAllYearStudy);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

module.exports = YearStudy;
