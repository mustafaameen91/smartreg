module.exports = (app) => {
   const nationalInfo = require("../controllers/nationalInfo.controllers.js");

   app.post("/api/addNationalInfo", nationalInfo.create);

   app.get("/api/nationalInfos", nationalInfo.findAll);

   app.get("/api/nationalInfo/:id", nationalInfo.findOne);

   app.put("/api/nationalInfo/:id", nationalInfo.update);

   app.delete("/api/nationalInfo/:id", nationalInfo.delete);

   app.delete("/api/nationalInfos", nationalInfo.deleteAll);
};
