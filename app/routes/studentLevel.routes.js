module.exports = (app) => {
   const studentLevel = require("../controllers/studentLevel.controllers.js");

   app.post("/api/addStudentLevel", studentLevel.create);

   app.get("/api/studentLevels", studentLevel.findAll);

   app.get("/api/studentLevel/:id", studentLevel.findOne);

   app.get("/api/storeStudentLevel/:id", studentLevel.createByFile);

   app.put("/api/studentLevel/:id", studentLevel.update);

   app.delete("/api/studentLevel/:id", studentLevel.delete);

   app.delete("/api/studentLevels", studentLevel.deleteAll);
};
