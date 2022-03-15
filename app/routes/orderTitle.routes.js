module.exports = (app) => {
   const orderTitle = require("../controllers/orderTitle.controllers.js");

   app.post("/api/addOrderTitle", orderTitle.create);

   app.get("/api/orderTitles", orderTitle.findAll);

   app.get("/api/orderTitle/:id", orderTitle.findOne);

   app.put("/api/orderTitle/:id", orderTitle.update);

   app.delete("/api/orderTitle/:id", orderTitle.delete);

   app.delete("/api/orderTitles", orderTitle.deleteAll);
};
