module.exports = (app) => {
   const studyCategory = require("../controllers/studyCategory.controllers.js");

   app.post("/api/addStudyCategory", studyCategory.create);

   app.get("/api/studyCategories", studyCategory.findAll);

   app.get("/api/studyCategory/:id", studyCategory.findOne);

   app.put("/api/studyCategory/:id", studyCategory.update);

   app.get("/api/storeStudyCategory", studyCategory.createByFile);

   app.delete("/api/studyCategory/:id", studyCategory.delete);

   app.delete("/api/studyCategories", studyCategory.deleteAll);
};
