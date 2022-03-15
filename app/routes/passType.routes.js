module.exports = (app) => {
   const passType = require("../controllers/passType.controllers.js");

   app.post("/api/addPassType", passType.create);

   app.get("/api/passTypes", passType.findAll);

   app.get("/api/passType/:id", passType.findOne);

   app.put("/api/passType/:id", passType.update);

   app.delete("/api/passType/:id", passType.delete);

   app.delete("/api/passTypes", passType.deleteAll);
};
