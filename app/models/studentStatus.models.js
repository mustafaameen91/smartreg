const {
   prismaErrorHandling,
   prismaInstance,
} = require("./../middleware/handleError.middleware.js");

const StudentStatus = function (studentStatus) {
   this.statusName = studentStatus.statusName;
};

StudentStatus.create = async (newStudentStatus, result) => {
   try {
      const studentStatus = await prismaInstance.studentStatus.create({
         data: newStudentStatus,
      });

      result(null, studentStatus);
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

StudentStatus.findById = async (studentStatusId, result) => {
   try {
      const singleStudentStatus = await prismaInstance.studentStatus.findUnique(
         {
            where: {
               idStudentStatus: JSON.parse(studentStatusId),
            },
         }
      );

      if (singleStudentStatus) {
         result(null, singleStudentStatus);
      } else {
         result({
            error: "Not Found",
            code: 404,
            errorMessage: "Not Found Student Status with this Id",
         });
      }
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

StudentStatus.getAll = async (result) => {
   try {
      const studentsStatus = await prismaInstance.studentStatus.findMany();
      result(null, studentsStatus);
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

StudentStatus.updateById = async (studentStatusId, studentStatus, result) => {
   try {
      const updateStudentStatus = await prismaInstance.studentStatus.update({
         where: { idStudentStatus: JSON.parse(studentStatusId) },
         data: studentStatus,
      });
      result(null, updateStudentStatus);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

StudentStatus.remove = async (id, result) => {
   try {
      const deleteStudentStatus = await prismaInstance.studentStatus.delete({
         where: { idStudentStatus: JSON.parse(id) },
      });
      result(null, deleteStudentStatus);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

StudentStatus.removeAll = async (result) => {
   try {
      const deleteAllStudentsStatus =
         await prismaInstance.studentStatus.deleteMany({});
      result(null, deleteAllStudentsStatus);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

module.exports = StudentStatus;
