module.exports = (app) => {
   const studentImage = require("../controllers/studentImage.controllers.js");

   app.post("/api/addStudentImage", studentImage.create);

   app.post("/api/addManyStudentImage", studentImage.createMany);

   app.get("/api/studentImages", studentImage.findAll);

   app.get("/api/studentImage/:id", studentImage.findOne);

   app.put("/api/studentImage/:id", studentImage.update);

   app.delete("/api/studentImage/:id", studentImage.delete);

   app.delete("/api/studentImages", studentImage.deleteAll);
};
