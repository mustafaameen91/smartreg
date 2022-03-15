module.exports = (app) => {
   const studySubCategory = require("../controllers/studySubCategory.controllers.js");

   app.post("/api/addStudySubCategory", studySubCategory.create);

   app.get("/api/studySubCategories", studySubCategory.findAll);

   app.get("/api/studySubCategory/:id", studySubCategory.findOne);

   app.put("/api/studySubCategory/:id", studySubCategory.update);

   app.delete("/api/studySubCategory/:id", studySubCategory.delete);

   app.delete("/api/studySubCategories", studySubCategory.deleteAll);
};
