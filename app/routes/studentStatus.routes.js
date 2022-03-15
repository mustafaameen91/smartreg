module.exports = (app) => {
   const studentStatus = require("../controllers/studentStatus.controllers.js");

   app.post("/api/addStudentStatus", studentStatus.create);

   app.get("/api/studentsStatus", studentStatus.findAll);

   app.get("/api/studentStatus/:id", studentStatus.findOne);

   app.put("/api/studentStatus/:id", studentStatus.update);

   app.delete("/api/studentStatus/:id", studentStatus.delete);

   app.delete("/api/studentsStatus", studentStatus.deleteAll);
};
