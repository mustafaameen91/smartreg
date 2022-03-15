module.exports = (app) => {
   const studentExitCauses = require("../controllers/studentExitCauses.controllers.js");

   app.post("/api/addStudentExitCauses", studentExitCauses.create);

   app.get("/api/studentsExitCauses", studentExitCauses.findAll);

   app.get("/api/studentExitCauses/:id", studentExitCauses.findOne);

   app.put("/api/studentExitCauses/:id", studentExitCauses.update);

   app.delete("/api/studentExitCauses/:id", studentExitCauses.delete);

   app.delete("/api/studentsExitCauses", studentExitCauses.deleteAll);
};
