module.exports = (app) => {
   const certificateStatus = require("../controllers/certificateStatus.controllers.js");

   app.post("/api/addCertificateStatus", certificateStatus.create);

   app.get("/api/certificatesStatus", certificateStatus.findAll);

   app.get("/api/certificateStatus/:id", certificateStatus.findOne);

   app.put("/api/certificateStatus/:id", certificateStatus.update);

   app.delete("/api/certificateStatus/:id", certificateStatus.delete);

   app.delete("/api/certificatesStatus", certificateStatus.deleteAll);
};
