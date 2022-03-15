module.exports = (app) => {
   const nationalityCertificate = require("../controllers/nationalityCertificate.controllers.js");

   app.post("/api/addNationalityCertificate", nationalityCertificate.create);

   app.get("/api/nationalityCertificates", nationalityCertificate.findAll);

   app.get("/api/nationalityCertificate/:id", nationalityCertificate.findOne);

   app.put("/api/nationalityCertificate/:id", nationalityCertificate.update);

   app.delete("/api/nationalityCertificate/:id", nationalityCertificate.delete);

   app.delete("/api/nationalityCertificates", nationalityCertificate.deleteAll);
};
