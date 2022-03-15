const {
   prismaErrorHandling,
   prismaInstance,
} = require("./../middleware/handleError.middleware.js");

const OrderTitle = function (orderTitle) {
   this.title = orderTitle.title;
   this.createdBy = orderTitle.createdBy;
};

OrderTitle.create = async (newOrderTitle, result) => {
   try {
      const orderTitle = await prismaInstance.orderTitle.create({
         data: newOrderTitle,
      });

      result(null, orderTitle);
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

OrderTitle.findById = async (orderTitleId, result) => {
   try {
      const singleOrderTitle = await prismaInstance.orderTitle.findUnique({
         where: {
            idOrderTitle: JSON.parse(orderTitleId),
         },
      });

      if (singleOrderTitle) {
         result(null, singleOrderTitle);
      } else {
         result({
            error: "Not Found",
            code: 404,
            errorMessage: "Not Found Order Title with this Id",
         });
      }
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

OrderTitle.getAll = async (result) => {
   try {
      const orderTitles = await prismaInstance.orderTitle.findMany();
      result(null, orderTitles);
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

OrderTitle.updateById = async (orderTitleId, orderTitle, result) => {
   try {
      const updateOrderTitle = await prismaInstance.orderTitle.update({
         where: { idOrderTitle: JSON.parse(orderTitleId) },
         data: orderTitle,
      });
      result(null, updateOrderTitle);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

OrderTitle.remove = async (id, result) => {
   try {
      const deleteOrderTitle = await prismaInstance.orderTitle.delete({
         where: { idOrderTitle: JSON.parse(id) },
      });
      result(null, deleteOrderTitle);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

OrderTitle.removeAll = async (result) => {
   try {
      const deleteAllOrderTitles = await prismaInstance.orderTitle.deleteMany(
         {}
      );
      result(null, deleteAllOrderTitles);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

module.exports = OrderTitle;
