const {
   prismaErrorHandling,
   prismaInstance,
} = require("./../middleware/handleError.middleware.js");
const fs = require("fs");

const Address = function (address) {
   this.provinceId = address.provinceId * 1;
   this.district = address.district;
   this.avenue = address.avenue;
   this.houseNumber = address.houseNumber;
   this.streetNumber = address.streetNumber;
   this.studentId = address.studentId * 1;
};

Address.create = async (newAddress, result) => {
   let data = {
      provinceId: newAddress.provinceId * 1,
      district: newAddress.district,
      avenue: newAddress.avenue,
      houseNumber: newAddress.houseNumber,
      streetNumber: newAddress.streetNumber,
      studentId: newAddress.studentId * 1,
   };
   console.log(newAddress);
   try {
      const address = await prismaInstance.address.upsert({
         where: {
            idAddress: newAddress.idAddress
               ? parseInt(newAddress.idAddress)
               : -1,
         },
         create: data,
         update: data,
      });
      console.log(address);
      result(null, address);
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

Address.findById = async (addressId, result) => {
   try {
      const singleAddress = await prismaInstance.address.findUnique({
         where: {
            idAddress: JSON.parse(addressId),
         },
      });

      if (singleAddress) {
         result(null, singleAddress);
      } else {
         result({
            error: "Not Found",
            code: 404,
            errorMessage: "Not Found Address with this Id",
         });
      }
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

Address.getAll = async (result) => {
   try {
      const addresses = await prismaInstance.address.findMany();
      result(null, addresses);
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

Address.createFromFile = async (result) => {
   let data = JSON.parse(
      fs.readFileSync(__dirname + "/studentsAddress.txt", "utf-8")
   );

   if (data.length > 0) {
      try {
         const section = await prismaInstance.address.createMany({
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

Address.updateById = async (addressId, address, result) => {
   try {
      const updateAddress = await prismaInstance.address.update({
         where: { idAddress: JSON.parse(addressId) },
         data: address,
      });
      result(null, updateAddress);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

Address.remove = async (id, result) => {
   try {
      const deleteAddress = await prismaInstance.address.delete({
         where: { idAddress: JSON.parse(id) },
      });
      result(null, deleteAddress);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

Address.removeAll = async (result) => {
   try {
      const deleteAllAddresses = await prismaInstance.address.deleteMany({});
      result(null, deleteAllAddresses);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

module.exports = Address;
