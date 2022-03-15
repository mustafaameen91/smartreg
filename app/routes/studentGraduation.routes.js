module.exports = (app) => {
   const studentGraduation = require("../controllers/studentGraduation.controllers.js");

   app.post("/api/addStudentGraduation", studentGraduation.create);

   app.get("/api/studentGraduations", studentGraduation.findAll);

   app.get("/api/studentGraduation/:id", studentGraduation.findOne);

   app.put("/api/studentGraduation/:id", studentGraduation.update);

   app.delete("/api/studentGraduation/:id", studentGraduation.delete);

   app.delete("/api/studentGraduations", studentGraduation.deleteAll);
};
