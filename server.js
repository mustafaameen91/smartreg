const express = require("express");
const app = express();
const cors = require("cors");
const fileUpload = require("express-fileupload");
const fs = require("fs");
const history = require("connect-history-api-fallback");

app.use(cors());
app.use(express.json());
app.use(fileUpload());

function generateRandomName(length, patientId) {
   var result = "";
   var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
   var charactersLength = characters.length;
   for (var i = 0; i < length; i++) {
      result +=
         characters.charAt(Math.floor(Math.random() * charactersLength)) +
         patientId;
   }
   return result;
}

app.post("/upload", function (req, res) {
   if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("No files were uploaded.");
   }

   let uploadedFile = req.files.attachment;
   let photoName = generateRandomName(5, 3);
   var filename = uploadedFile.name;
   var ext = filename.substr(filename.lastIndexOf(".") + 1);
   let imagePath = `${__dirname}/app/studentImages/${photoName}.${ext}`;

   uploadedFile.mv(imagePath, function (err) {
      if (err) return res.status(500).send(err);

      res.send({ imagePath: `studentImages/${photoName}.${ext}` });
   });
});

app.get("/api/studentImages/:file", function (request, response) {
   let file = request.params.file;
   var extension = file.split(".").pop();
   var tempFile = `./app/studentImages/${file}`;

   fs.readFile(tempFile, function (err, data) {
      switch (extension) {
         case "jpg":
            contentType = "image/jpg";
            isImage = 1;
            break;
         case "png":
            contentType = "image/png";
            isImage = 1;
            break;
         case "jpeg":
            contentType = "image/jpeg";
            isImage = 1;
            break;
      }
      response.contentType(contentType);
      response.send(data);
   });
});

require("./app/routes/administrativeOrder.routes.js")(app);
require("./app/routes/orderTitle.routes.js")(app);
require("./app/routes/exitCauses.routes.js")(app);
require("./app/routes/studentResponsible.routes.js")(app);
require("./app/routes/passType.routes.js")(app);
require("./app/routes/role.routes.js")(app);
require("./app/routes/user.routes.js")(app);
require("./app/routes/student.routes.js")(app);
require("./app/routes/nationalityCertificate.routes.js")(app);
require("./app/routes/nationalInfo.routes.js")(app);
require("./app/routes/studentGraduation.routes.js")(app);
require("./app/routes/studentLevel.routes.js")(app);
require("./app/routes/studentSchool.routes.js")(app);
require("./app/routes/studyCategory.routes")(app);
require("./app/routes/studySubCategory.routes")(app);
require("./app/routes/studentStatus.routes.js")(app);
require("./app/routes/acceptedType.routes.js")(app);
require("./app/routes/province.routes.js")(app);
require("./app/routes/address.routes.js")(app);
require("./app/routes/section.routes.js")(app);
require("./app/routes/studentImage.routes.js")(app);
require("./app/routes/certificateStatus.routes.js")(app);
require("./app/routes/yearStudy.routes.js")(app);
require("./app/routes/imageType.routes.js")(app);
require("./app/routes/studentExitCauses.routes.js")(app);

const staticFileMiddleware = express.static(__dirname + "/dist");
app.use(staticFileMiddleware);
app.use(
   history({
      disableDotRule: true,
      verbose: true,
   })
);

app.use(staticFileMiddleware);

app.listen(3100, () => {
   console.log("app listening on port 3100");
});
