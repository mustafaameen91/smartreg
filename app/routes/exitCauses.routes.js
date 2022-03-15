module.exports = (app) => {
   const exitCauses = require("../controllers/exitCauses.controllers.js");

   app.post("/api/addExitCauses", exitCauses.create);

   app.post("/api/addManyExitCauses", exitCauses.createMany);

   app.get("/api/allExitCauses", exitCauses.findAll);

   app.get("/api/exitCauses/:id", exitCauses.findOne);

   app.put("/api/exitCauses/:id", exitCauses.update);

   app.delete("/api/exitCauses/:id", exitCauses.delete);

   app.delete("/api/allExitCauses", exitCauses.deleteAll);
};
