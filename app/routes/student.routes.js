module.exports = (app) => {
   const student = require("../controllers/student.controllers.js");

   app.post("/api/addStudent", student.create);

   app.get("/api/students", student.findAll);

   app.get("/api/getStudents", student.findBySearch);

   app.get("/api/getMultiStudents", student.findByMultiSearch);

   app.get("/api/storeStudents", student.createByFile);

   app.get("/api/studentsSectionCount", student.findStudentsCount);

   app.get("/api/student/:id", student.findOne);

   app.put("/api/student/:id", student.update);

   app.delete("/api/student/:id", student.delete);

   app.delete("/api/students", student.deleteAll);
};
