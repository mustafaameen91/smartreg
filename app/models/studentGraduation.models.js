const {
   prismaErrorHandling,
   prismaInstance,
} = require("./../middleware/handleError.middleware.js");
const fs = require("fs");

const StudentGraduation = function (studentGraduation) {
   this.graduationDate = studentGraduation.graduationDate;
   this.studentId = studentGraduation.studentId;
};

StudentGraduation.create = async (newStudentGraduation, result) => {
   try {
      const studentGraduation = await prismaInstance.studentGraduation.create({
         data: newStudentGraduation,
      });

      result(null, studentGraduation);
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

StudentGraduation.createFromFile = async (result) => {
   let data = JSON.parse(
      fs.readFileSync(__dirname + "/studentsGraduation.txt", "utf-8")
   );

   if (data.length > 0) {
      try {
         const section = await prismaInstance.studentGraduation.createMany({
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

StudentGraduation.findById = async (studentGraduationId, result) => {
   try {
      const singleStudentGraduation =
         await prismaInstance.studentGraduation.findUnique({
            where: {
               idStudentGraduation: JSON.parse(studentGraduationId),
            },
         });

      if (singleStudentGraduation) {
         result(null, singleStudentGraduation);
      } else {
         result({
            error: "Not Found",
            code: 404,
            errorMessage: "Not Found Student Graduation with this Id",
         });
      }
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

StudentGraduation.createFromFile = async (result) => {
   let data = JSON.parse(
      fs.readFileSync(__dirname + "/studentsGraduation.txt", "utf-8")
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

StudentGraduation.getAll = async (result) => {
   try {
      const studentGraduations =
         await prismaInstance.studentGraduation.findMany();
      result(null, studentGraduations);
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

StudentGraduation.updateById = async (
   studentGraduationId,
   studentGraduation,
   result
) => {
   try {
      const updateStudentGraduation =
         await prismaInstance.studentGraduation.update({
            where: { idStudentGraduation: JSON.parse(studentGraduationId) },
            data: studentGraduation,
         });
      result(null, updateStudentGraduation);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

StudentGraduation.remove = async (id, result) => {
   try {
      const deleteStudentGraduation =
         await prismaInstance.studentGraduation.delete({
            where: { idStudentGraduation: JSON.parse(id) },
         });
      result(null, deleteStudentGraduation);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

StudentGraduation.removeAll = async (result) => {
   try {
      const deleteAllStudentGraduations =
         await prismaInstance.studentGraduation.deleteMany({});
      result(null, deleteAllStudentGraduations);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

module.exports = StudentGraduation;
