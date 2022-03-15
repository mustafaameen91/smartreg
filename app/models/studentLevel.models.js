const {
   prismaErrorHandling,
   prismaInstance,
} = require("./../middleware/handleError.middleware.js");
const fs = require("fs");

const StudentLevel = function (studentLevel) {
   this.level = studentLevel.level;
   this.class = studentLevel.class;
   this.yearStudyId = studentLevel.yearStudyId;
   this.studentId = studentLevel.studentId;
};

StudentLevel.create = async (newStudentLevel, result) => {
   try {
      const studentLevel = await prismaInstance.studentLevel.create({
         data: newStudentLevel,
      });

      result(null, studentLevel);
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

StudentLevel.findById = async (studentLevelId, result) => {
   try {
      const singleStudentLevel = await prismaInstance.studentLevel.findUnique({
         where: {
            idStudentLevel: JSON.parse(studentLevelId),
         },
      });

      if (singleStudentLevel) {
         result(null, singleStudentLevel);
      } else {
         result({
            error: "Not Found",
            code: 404,
            errorMessage: "Not Found Student Level with this Id",
         });
      }
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

StudentLevel.createFromFile = async (result) => {
   let data = JSON.parse(
      fs.readFileSync(__dirname + "/studentsLevel.txt", "utf-8")
   );

   if (data.length > 0) {
      try {
         const section = await prismaInstance.studentLevel.createMany({
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

StudentLevel.getAll = async (result) => {
   try {
      const studentLevels = await prismaInstance.studentLevel.findMany();
      result(null, studentLevels);
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

StudentLevel.updateById = async (studentLevelId, studentLevel, result) => {
   try {
      const updateStudentLevel = await prismaInstance.studentLevel.update({
         where: { idStudentLevel: JSON.parse(studentLevelId) },
         data: studentLevel,
      });
      result(null, updateStudentLevel);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

StudentLevel.remove = async (id, result) => {
   try {
      const deleteStudentLevel = await prismaInstance.studentLevel.delete({
         where: { idStudentLevel: JSON.parse(id) },
      });
      result(null, deleteStudentLevel);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

StudentLevel.removeAll = async (result) => {
   try {
      const deleteAllStudentLevel =
         await prismaInstance.studentLevel.deleteMany({});
      result(null, deleteAllStudentLevel);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

module.exports = StudentLevel;
