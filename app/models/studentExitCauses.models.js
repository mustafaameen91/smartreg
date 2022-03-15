const {
   prismaErrorHandling,
   prismaInstance,
} = require("./../middleware/handleError.middleware.js");

const StudentExitCauses = function (studentExitCauses) {
   this.sectionName = studentExitCauses.sectionName;
   this.code = studentExitCauses.code;
   this.englishName = studentExitCauses.englishName;
};

StudentExitCauses.create = async (newStudentExitCauses, result) => {
   try {
      const studentExitCauses = await prismaInstance.studentExitCauses.create({
         data: newStudentExitCauses,
      });

      result(null, studentExitCauses);
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

StudentExitCauses.findById = async (studentExitCausesId, result) => {
   try {
      const singleStudentExitCauses =
         await prismaInstance.studentExitCauses.findUnique({
            where: {
               idStudentExitCauses: JSON.parse(studentExitCausesId),
            },
         });

      if (singleStudentExitCauses) {
         result(null, singleStudentExitCauses);
      } else {
         result({
            error: "Not Found",
            code: 404,
            errorMessage: "Not Found Student Exit Causes with this Id",
         });
      }
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

StudentExitCauses.getAll = async (result) => {
   try {
      const allStudentExitCauses =
         await prismaInstance.studentExitCauses.findMany();
      result(null, allStudentExitCauses);
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

StudentExitCauses.updateById = async (
   studentExitCausesId,
   studentExitCauses,
   result
) => {
   try {
      const updateStudentExitCauses =
         await prismaInstance.studentExitCauses.update({
            where: { idStudentExitCauses: JSON.parse(studentExitCausesId) },
            data: studentExitCauses,
         });
      result(null, updateStudentExitCauses);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

StudentExitCauses.remove = async (id, result) => {
   try {
      const deleteStudentExitCauses =
         await prismaInstance.studentExitCauses.delete({
            where: { idStudentExitCauses: JSON.parse(id) },
         });
      result(null, deleteStudentExitCauses);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

StudentExitCauses.removeAll = async (result) => {
   try {
      const deleteAllStudentExitCauses =
         await prismaInstance.studentExitCauses.deleteMany({});
      result(null, deleteAllStudentExitCauses);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

module.exports = StudentExitCauses;
