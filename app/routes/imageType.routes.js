module.exports = (app) => {
   const imageType = require("../controllers/imageType.controllers.js");

   app.post("/api/addImageType", imageType.create);

   app.get("/api/imageTypes", imageType.findAll);

   app.get("/api/imageType/:id", imageType.findOne);

   app.put("/api/imageType/:id", imageType.update);

   app.delete("/api/imageType/:id", imageType.delete);

   app.delete("/api/imageTypes", imageType.deleteAll);
};
