module.exports = (app) => {
   const province = require("../controllers/province.controllers.js");

   app.post("/api/addProvince", province.create);

   app.get("/api/provinces", province.findAll);

   app.get("/api/province/:id", province.findOne);

   app.put("/api/province/:id", province.update);

   app.delete("/api/province/:id", province.delete);

   app.delete("/api/provinces", province.deleteAll);
};
