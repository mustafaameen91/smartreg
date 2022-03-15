module.exports = (app) => {
   const acceptedType = require("../controllers/acceptedType.controllers.js");

   app.post("/api/addAcceptedType", acceptedType.create);

   app.get("/api/acceptedTypes", acceptedType.findAll);

   app.get("/api/acceptedType/:id", acceptedType.findOne);

   app.put("/api/acceptedType/:id", acceptedType.update);

   app.delete("/api/acceptedType/:id", acceptedType.delete);

   app.delete("/api/acceptedTypes", acceptedType.deleteAll);
};
