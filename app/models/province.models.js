const {
   prismaErrorHandling,
   prismaInstance,
} = require("./../middleware/handleError.middleware.js");

const Province = function (province) {
   this.provinceName = province.provinceName;
   this.provinceNameEn = province.provinceNameEn;
};

Province.create = async (newProvince, result) => {
   try {
      const province = await prismaInstance.province.create({
         data: newProvince,
      });

      result(null, province);
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

Province.findById = async (provinceId, result) => {
   try {
      const singleProvince = await prismaInstance.province.findUnique({
         where: {
            idProvince: JSON.parse(provinceId),
         },
      });

      if (singleProvince) {
         result(null, singleProvince);
      } else {
         result({
            error: "Not Found",
            code: 404,
            errorMessage: "Not Found Province with this Id",
         });
      }
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

Province.getAll = async (result) => {
   try {
      const provinces = await prismaInstance.province.findMany();
      result(null, provinces);
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

Province.updateById = async (provinceId, province, result) => {
   try {
      const updateProvince = await prismaInstance.province.update({
         where: { idProvince: JSON.parse(provinceId) },
         data: province,
      });
      result(null, updateProvince);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

Province.remove = async (id, result) => {
   try {
      const deleteProvince = await prismaInstance.province.delete({
         where: { idProvince: JSON.parse(id) },
      });
      result(null, deleteProvince);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

Province.removeAll = async (result) => {
   try {
      const deleteAllProvinces = await prismaInstance.province.deleteMany({});
      result(null, deleteAllProvinces);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

module.exports = Province;
