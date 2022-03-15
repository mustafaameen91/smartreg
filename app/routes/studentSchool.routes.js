module.exports = (app) => {
   const studentSchool = require("../controllers/studentSchool.controllers.js");

   app.post("/api/addStudentSchool", studentSchool.create);

   app.get("/api/studentSchools", studentSchool.findAll);

   app.get("/api/studentSchool/:id", studentSchool.findOne);

   app.put("/api/studentSchool/:id", studentSchool.update);

   app.put("/api/manyStudentSchool", studentSchool.updateMany);

   app.get("/api/storeSchool", studentSchool.createByFile);

   app.delete("/api/studentSchool/:id", studentSchool.delete);

   app.delete("/api/studentSchools", studentSchool.deleteAll);
};
