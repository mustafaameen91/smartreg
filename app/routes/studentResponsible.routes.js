module.exports = (app) => {
   const studentResponsible = require("../controllers/studentResponsible.controllers.js");

   app.post("/api/addStudentResponsible", studentResponsible.create);

   app.post("/api/addManyResponsible", studentResponsible.createMany);

   app.get("/api/studentsResponsible", studentResponsible.findAll);

   app.get("/api/studentResponsible/:id", studentResponsible.findOne);

   app.put("/api/studentResponsible/:id", studentResponsible.update);

   app.delete("/api/studentResponsible/:id", studentResponsible.delete);

   app.delete("/api/studentsResponsible", studentResponsible.deleteAll);
};
