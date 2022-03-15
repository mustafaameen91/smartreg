module.exports = (app) => {
   const address = require("../controllers/address.controllers.js");

   app.post("/api/addAddress", address.create);

   app.get("/api/addresses", address.findAll);

   app.get("/api/address/:id", address.findOne);

   app.get("/api/storeStudentsAddress", address.createByFile);

   app.put("/api/address/:id", address.update);

   app.delete("/api/address/:id", address.delete);

   app.delete("/api/addresses", address.deleteAll);
};
