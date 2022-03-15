const {
   prismaErrorHandling,
   prismaInstance,
} = require("./../middleware/handleError.middleware.js");
const fs = require("fs");

const Section = function (section) {
   this.sectionName = section.sectionName;
   this.englishName = section.englishName;
   this.code = section.code;
};

Section.create = async (newSection, result) => {
   try {
      const section = await prismaInstance.section.create({
         data: newSection,
      });

      result(null, section);
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

Section.createFromFile = async (result) => {
   let data = JSON.parse(fs.readFileSync(__dirname + "/sections.txt", "utf-8"));

   if (data.length > 0) {
      try {
         const section = await prismaInstance.section.createMany({
            data: data,
         });

         result(null, section);
      } catch (err) {
         console.log(prismaErrorHandling(err));
         result(prismaErrorHandling(err), null);
      }
   } else {
      result(null, { message: "notValid" });
   }
};

Section.findById = async (sectionId, result) => {
   try {
      const singleSection = await prismaInstance.section.findUnique({
         where: {
            idSection: JSON.parse(sectionId),
         },
      });

      if (singleSection) {
         result(null, singleSection);
      } else {
         result({
            error: "Not Found",
            code: 404,
            errorMessage: "Not Found Section with this Id",
         });
      }
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

Section.getAll = async (result) => {
   try {
      const sections = await prismaInstance.section.findMany();
      result(null, sections);
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

Section.updateById = async (sectionId, section, result) => {
   try {
      const updateSection = await prismaInstance.section.update({
         where: { idSection: JSON.parse(sectionId) },
         data: section,
      });
      result(null, updateSection);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

Section.remove = async (id, result) => {
   try {
      const deleteSection = await prismaInstance.section.delete({
         where: { idSection: JSON.parse(id) },
      });
      result(null, deleteSection);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

Section.removeAll = async (result) => {
   try {
      const deleteAllSections = await prismaInstance.section.deleteMany({});
      result(null, deleteAllSections);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

module.exports = Section;
