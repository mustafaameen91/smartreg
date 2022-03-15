const {
   prismaErrorHandling,
   prismaInstance,
} = require("./../middleware/handleError.middleware.js");
const fs = require("fs");

const AdministrativeOrder = function (administrativeOrder) {
   this.orderTitleId = administrativeOrder.orderTitleId;
   this.orderNumber = administrativeOrder.orderNumber;
   this.orderDescription = administrativeOrder.orderDescription;
   this.orderYear = administrativeOrder.orderYear * 1;
   this.orderLevel = administrativeOrder.orderLevel;
   this.studentId = administrativeOrder.studentId;
   this.orderDate = new Date(administrativeOrder.orderDate);
   this.createdBy = administrativeOrder.createdBy;
};

AdministrativeOrder.create = async (
   newAdministrativeOrder,
   studentStatusId,
   result
) => {
   try {
      const administrativeOrder =
         await prismaInstance.administrativeOrder.create({
            data: newAdministrativeOrder,
         });

      if (studentStatusId) {
         const updateStatus = await prismaInstance.student.update({
            where: {
               idStudent: parseInt(newAdministrativeOrder.studentId),
            },
            data: {
               studentStatusId: parseInt(studentStatusId),
            },
         });
         console.log(updateStatus);
      }

      result(null, administrativeOrder);
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

AdministrativeOrder.createManyOrders = async (
   newAdministrativeOrders,
   result
) => {
   try {
      let studentStatusId = newAdministrativeOrders[0].studentStatusId;

      console.log(studentStatusId);

      let adminData = newAdministrativeOrders.map((order) => {
         return {
            orderTitleId: order.orderTitleId * 1,
            orderNumber: order.orderNumber,
            orderDescription: order.orderDescription,
            orderYear: order.orderYear * 1,
            orderLevel: order.orderLevel * 1,
            studentId: order.studentId * 1,
            orderDate: new Date(order.orderDate),
            createdBy: order.createdBy * 1,
         };
      });

      const administrativeOrder =
         await prismaInstance.administrativeOrder.createMany({
            data: adminData,
         });

      let condition = newAdministrativeOrders.map((student, index) => {
         return student.studentId;
      });

      const changeStudentStatus = await prismaInstance.student.updateMany({
         where: {
            idStudent: { in: condition },
         },
         data: {
            studentStatusId: studentStatusId,
         },
      });

      if (studentStatusId * 1 == 3) {
         let data = condition.map((id) => {
            return {
               studentId: id,
               graduationDate: adminData[0].orderYear,
            };
         });
         console.log(data);
         const addStudentGraduation =
            await prismaInstance.studentGraduation.createMany({
               data: data,
            });

         console.log(addStudentGraduation);
      }

      result(null, {
         administrativeOrder: administrativeOrder,
         studentStatus: changeStudentStatus,
      });
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

AdministrativeOrder.createManyOrdersUpgrade = async (
   newAdministrativeOrders,
   result
) => {
   try {
      let studentStatusId = newAdministrativeOrders[0].studentStatusId;
      let adminData = newAdministrativeOrders.map((order) => {
         return {
            orderTitleId: order.orderTitleId * 1,
            orderNumber: order.orderNumber,
            orderDescription: order.orderDescription,
            orderYear: order.orderYear * 1,
            orderLevel: order.orderLevel * 1,
            studentId: order.studentId * 1,
            orderDate: new Date(order.orderDate),
            createdBy: order.createdBy * 1,
         };
      });

      const administrativeOrder =
         await prismaInstance.administrativeOrder.createMany({
            data: adminData,
         });

      let condition = newAdministrativeOrders.map((student, index) => {
         return student.studentId;
      });

      let studentLevels = newAdministrativeOrders.map((student, index) => {
         return {
            studentId: student.studentId * 1,
            level: student.level * 1,
            yearStudyId: student.orderYear * 1,
            class: student.class,
         };
      });

      if (studentStatusId * 1 == 3) {
         let data = condition.map((id) => {
            return {
               studentId: id,
               graduationDate: adminData[0].orderYear,
            };
         });
         console.log(data);
         const addStudentGraduation =
            await prismaInstance.studentGraduation.createMany({
               data: data,
            });

         console.log(addStudentGraduation);
      }

      const changeStudentStatus = await prismaInstance.student.updateMany({
         where: {
            idStudent: { in: condition },
         },
         data: {
            studentStatusId: studentStatusId,
         },
      });

      let studentLevelIds = studentLevels.map((level) => level.studentId);

      const deleteManyLevels = await prismaInstance.studentLevel.deleteMany({
         where: {
            AND: [
               {
                  studentId: { in: studentLevelIds },
               },
               {
                  level: { gte: studentLevels[0].level },
               },
            ],
         },
      });

      console.log(deleteManyLevels);

      const studentsLevel = await prismaInstance.studentLevel.createMany({
         data: studentLevels,
      });

      console.log({
         administrativeOrder: administrativeOrder,
         studentStatus: changeStudentStatus,
         studentLevel: studentsLevel,
      });

      result(null, {
         administrativeOrder: administrativeOrder,
         studentStatus: changeStudentStatus,
         studentLevel: studentsLevel,
      });
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

AdministrativeOrder.getByFilter = async (filter, result) => {
   try {
      let exit;
      if (filter.exitCauseTitle) {
         exit = {
            ExitCauses: {
               some: {
                  exitCausesTitle: filter.exitCauseTitle,
               },
            },
         };
      } else {
         exit = {
            ExitCauses: undefined,
         };
      }

      let studentFilter = {
         sectionId: filter.sectionId,
         studentStatusId: filter.studentStatusId,
         gender: filter.gender,
         studyType: filter.studyType,
         registerYearId: filter.registerYearId,
         studentGraduation: {
            graduationDate: filter.studentGraduation,
         },
         ...exit,
         // studentLevel: {
         //    // some: {
         //    //    level: filter.studentLevel,
         //    // },

         //    level: filter.studentLevel,
         //    orderBy: {
         //       idStudentLevel: "desc",
         //    },
         //    take: 1,
         // },
         studentSchool: {
            studySubCategoryId: filter.studySubCategoryId,
         },
      };

      let adminOrderFilter = {
         orderTitleId: filter.orderTitleId,
         orderNumber: filter.orderNumber,
         orderYear: filter.orderYear,
         orderLevel: filter.orderLevel,
         orderDate: filter.orderDate,
         studentId: filter.studentId,
         student: { ...studentFilter },
      };

      const singleAdministrativeOrder =
         await prismaInstance.administrativeOrder.findMany({
            where: {
               ...adminOrderFilter,
            },
            include: {
               user: true,
               orderTitle: true,
               yearStudy: true,
               student: {
                  include: {
                     ExitCauses: true,
                     yearStudy: true,
                     section: true,
                     nationalInfo: true,
                     nationalityCertificate: true,
                     studentSchool: {
                        include: {
                           yearStudy: true,
                           passType: true,
                           certificateStatus: true,
                           studySubCategory: {
                              include: {
                                 studyCategory: true,
                              },
                           },
                        },
                     },
                     studentLevel: {
                        orderBy: {
                           idStudentLevel: "desc",
                        },
                     },
                     studentGraduation: {
                        include: {
                           yearStudy: true,
                        },
                     },
                     studentImage: true,
                     studentStatus: true,
                     acceptedType: true,
                     studentResponsables: true,
                     address: {
                        include: {
                           province: {
                              select: {
                                 provinceName: true,
                              },
                           },
                        },
                     },
                  },
               },
            },
         });

      if (singleAdministrativeOrder) {
         let filteredData = singleAdministrativeOrder.filter((order) => {
            if (order.student.studentLevel.length > 0) {
               let maxLevel = Math.max.apply(
                  Math,
                  order.student.studentLevel.map(function (o) {
                     return o.level;
                  })
               );
               if (filter.studentLevel) {
                  if (maxLevel == filter.studentLevel) {
                     return order;
                  }
               } else {
                  return order;
               }
            }
         });

         console.log(filteredData);

         result(null, filteredData);
      } else {
         result({
            error: "Not Found",
            code: 404,
            errorMessage: "Not Found Administrative Order with this Id",
         });
      }
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

AdministrativeOrder.removeAllByFile = async (fileName, result) => {
   let data = JSON.parse(
      fs.readFileSync(__dirname + "/" + limit.fileName, "utf-8")
   );
   try {
      for (let i = 0; i < data.length; i++) {
         const deleteAllAdministrativeOrders =
            await prismaInstance.administrativeOrder.deleteMany({
               where: {
                  AND: [
                     {
                        orderDescription: data[i].orderDescription,
                     },
                     {
                        studentId: data[i].studentId,
                     },
                     {
                        orderNumber: data[i].orderNumber,
                     },
                  ],
               },
            });
      }

      result(null, { message: "done" });
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

AdministrativeOrder.createFromFile = async (limit, result) => {
   let data = JSON.parse(
      fs.readFileSync(__dirname + "/" + limit.fileName, "utf-8")
   );

   if (data.length > 0) {
      let firstData = data.slice(limit.begin, limit.end);

      try {
         const section = await prismaInstance.administrativeOrder.createMany({
            data: firstData,
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

AdministrativeOrder.findByStudentId = async (studentId, result) => {
   try {
      const singleAdministrativeOrder =
         await prismaInstance.administrativeOrder.findMany({
            where: {
               studentId: JSON.parse(studentId),
            },
            include: {
               user: true,
               orderTitle: true,
               yearStudy: true,
               student: {
                  include: {
                     yearStudy: true,
                     section: true,
                     studentSchool: true,
                     studentLevel: {
                        take: 1,
                        orderBy: {
                           idStudentLevel: "desc",
                        },
                        include: {
                           yearStudy: true,
                        },
                     },
                     ExitCauses: true,
                     studentGraduation: {
                        include: {
                           yearStudy: true,
                        },
                     },
                     studentImage: true,
                     studentStatus: true,
                     acceptedType: true,
                     address: {
                        include: {
                           province: {
                              select: {
                                 provinceName: true,
                              },
                           },
                        },
                     },
                  },
               },
            },
         });

      if (singleAdministrativeOrder) {
         result(null, singleAdministrativeOrder);
      } else {
         result({
            error: "Not Found",
            code: 404,
            errorMessage: "Not Found Administrative Order with this Id",
         });
      }
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

AdministrativeOrder.findById = async (administrativeId, result) => {
   try {
      const singleAdministrativeOrder =
         await prismaInstance.administrativeOrder.findUnique({
            where: {
               idAdministrative: JSON.parse(administrativeId),
            },
            include: {
               user: true,
               orderTitle: true,
               yearStudy: true,
               student: {
                  include: {
                     ExitCauses: true,
                     yearStudy: true,
                     section: true,
                     studentSchool: true,
                     studentLevel: {
                        take: 1,
                        orderBy: {
                           idStudentLevel: "desc",
                        },
                        include: {
                           yearStudy: true,
                        },
                     },
                     studentGraduation: true,
                     studentImage: true,
                     studentStatus: true,
                     acceptedType: true,
                     address: {
                        include: {
                           province: {
                              select: {
                                 provinceName: true,
                              },
                           },
                        },
                     },
                  },
               },
            },
         });

      if (singleAdministrativeOrder) {
         result(null, singleAdministrativeOrder);
      } else {
         result({
            error: "Not Found",
            code: 404,
            errorMessage: "Not Found Administrative Order with this Id",
         });
      }
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

AdministrativeOrder.getAllWithCount = async (result) => {
   try {
      const administrativeOrders =
         await prismaInstance.administrativeOrder.count();
      const students = await prismaInstance.student.count();

      result(null, {
         ordersCount: administrativeOrders,
         studentsCount: students,
      });
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

AdministrativeOrder.getAll = async (result) => {
   try {
      const administrativeOrders =
         await prismaInstance.administrativeOrder.findMany({
            include: {
               user: true,
               orderTitle: true,
               yearStudy: true,
               student: {
                  include: {
                     ExitCauses: true,
                     yearStudy: true,
                     section: true,
                     nationalInfo: true,
                     nationalityCertificate: true,
                     studentSchool: {
                        include: {
                           yearStudy: true,
                           passType: true,
                           certificateStatus: true,
                           studySubCategory: {
                              include: {
                                 studyCategory: true,
                              },
                           },
                        },
                     },
                     studentLevel: {
                        take: 1,
                        orderBy: {
                           idStudentLevel: "desc",
                        },
                        include: {
                           yearStudy: true,
                        },
                     },
                     studentGraduation: {
                        include: {
                           yearStudy: true,
                        },
                     },
                     studentImage: true,
                     studentStatus: true,
                     acceptedType: true,
                     studentResponsables: true,
                     address: {
                        include: {
                           province: {
                              select: {
                                 provinceName: true,
                              },
                           },
                        },
                     },
                  },
               },
            },
         });
      result(null, administrativeOrders);
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

AdministrativeOrder.updateManyOrder = async (administrativeOrder, result) => {
   let data = {
      orderTitleId: administrativeOrder.orderTitleId * 1,
      orderNumber: administrativeOrder.orderNumber,
      orderDescription: administrativeOrder.orderDescription,
      orderYear: administrativeOrder.orderYear * 1,
      orderLevel: administrativeOrder.orderLevel * 1,
      orderDate: new Date(administrativeOrder.orderDate),
   };

   let condition = administrativeOrder.studentIds;
   let studentStatusId = administrativeOrder.studentStatusId;

   try {
      const updateAdministrativeOrder =
         await prismaInstance.administrativeOrder.updateMany({
            where: {
               AND: [
                  {
                     orderNumber: {
                        equals: administrativeOrder.oldOrderNumber,
                     },
                  },
                  {
                     orderYear: {
                        equals: administrativeOrder.oldOrderYear,
                     },
                  },
               ],
            },

            data: data,
         });
      if (condition) {
         const changeStudentStatus = await prismaInstance.student.updateMany({
            where: {
               idStudent: { in: condition },
            },
            data: {
               studentStatusId: studentStatusId,
            },
         });
         result(null, {
            AdministrativeOrderUpdated: updateAdministrativeOrder,
            studentStatus: changeStudentStatus,
         });
      } else {
         result(null, {
            AdministrativeOrderUpdated: updateAdministrativeOrder,
            studentStatus: "Not Found",
         });
      }
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

AdministrativeOrder.updateByIdsMultiple = async (
   administrativeOrder,
   result
) => {
   try {
      let ids = administrativeOrder.orderIds.map(
         (order) => order.idAdministrative
      );

      let studentIds = administrativeOrder.orderIds.map(
         (order) => order.studentId
      );
      console.log(studentIds);

      let studentStatus = administrativeOrder.studentStatusId;

      const updateAdministrativeOrder =
         await prismaInstance.administrativeOrder.updateMany({
            where: { idAdministrative: { in: ids } },
            data: administrativeOrder.updatedData,
         });

      console.log(`exit cause ${administrativeOrder.isExit}`);
      //isExit == 1 means that the student status change from exit to continue
      //isExit == 2 means that the student status remain exit but the reason is updatedData
      //isExit == 3 means that the student status change from continue to exit

      if (administrativeOrder.isExit == 1) {
         const deleteMany = await prismaInstance.exitCauses.deleteMany({
            where: {
               studentId: {
                  in: studentIds,
               },
            },
         });
         console.log(`exit deleted -------> ${deleteMany}`);
      } else if (administrativeOrder.isExit == 2) {
         const createExitCauses = await prismaInstance.exitCauses.updateMany({
            where: {
               studentId: { in: studentIds },
            },
            data: { exitCausesTitle: administrativeOrder.exitCauses },
         });

         console.log(`exit updated -------> ${createExitCauses}`);
      } else {
         if (studentStatus == 5) {
            let studentsExit = studentIds.map((exit) => {
               return {
                  exitCausesTitle: administrativeOrder.exitCauses,
                  createdBy: administrativeOrder.createdBy,
                  studentId: exit,
               };
            });

            const createExitCauses = await prismaInstance.exitCauses.createMany(
               {
                  data: studentsExit,
               }
            );

            console.log(`exit created -------> ${createExitCauses}`);
         }
      }

      const updateStudentStatus = await prismaInstance.student.updateMany({
         where: {
            idStudent: { in: studentIds },
         },
         data: {
            studentStatusId: studentStatus,
         },
      });
      console.log(updateStudentStatus);
      result(null, { updateAdministrativeOrder: updateAdministrativeOrder });
      // console.log(updateAdministrativeOrder);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

AdministrativeOrder.updateById = async (
   administrativeId,
   administrativeOrder,
   result
) => {
   console.log(`admin id : ${administrativeId}`);
   console.log(administrativeOrder);
   try {
      let administrativeOrderForUpdate = {
         orderTitleId: administrativeOrder.orderTitleId,
         orderNumber: administrativeOrder.orderNumber,
         orderDescription: administrativeOrder.orderDescription,
         orderYear: administrativeOrder.orderYear * 1,
         orderLevel: administrativeOrder.orderLevel,
         studentId: administrativeOrder.studentId,
         orderDate: new Date(administrativeOrder.orderDate),
         createdBy: administrativeOrder.createdBy,
      };

      let studentStatus = administrativeOrder.studentStatusId;

      const updateAdministrativeOrder =
         await prismaInstance.administrativeOrder.update({
            where: { idAdministrative: JSON.parse(administrativeId) },
            data: administrativeOrderForUpdate,
         });

      const updateStudentStatus = await prismaInstance.student.update({
         where: {
            idStudent: parseInt(administrativeOrder.studentId),
         },
         data: {
            studentStatusId: studentStatus,
         },
      });
      console.log(updateStudentStatus);
      result(null, updateAdministrativeOrder);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

AdministrativeOrder.remove = async (id, result) => {
   try {
      const deleteAdministrativeOrder =
         await prismaInstance.administrativeOrder.delete({
            where: { idAdministrative: JSON.parse(id) },
         });
      result(null, deleteAdministrativeOrder);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

AdministrativeOrder.removeAll = async (orderIds, result) => {
   try {
      if (orderIds) {
         const getOrders = await prismaInstance.administrativeOrder.findMany({
            where: {
               idAdministrative: { in: orderIds },
            },
         });
         let students = getOrders.map((order) => order.studentId);
         const exit = await prismaInstance.exitCauses.deleteMany({
            where: {
               studentId: { in: students },
            },
         });

         console.log(exit);
         const deleteAllAdministrativeOrders =
            await prismaInstance.administrativeOrder.deleteMany({
               where: {
                  idAdministrative: { in: orderIds },
               },
            });
         result(null, deleteAllAdministrativeOrders);
      } else {
         result(
            { error: "unable to delete", code: 404 },
            deleteAllAdministrativeOrders
         );
      }
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

AdministrativeOrder.removeAllByOrderNumber = async (
   orderNumber,
   orderYear,
   result
) => {
   try {
      const deleteAllAdministrativeOrders =
         await prismaInstance.administrativeOrder.deleteMany({
            where: {
               orderNumber: orderNumber,
               AND: {
                  orderYear: orderYear,
               },
            },
         });
      result(null, deleteAllAdministrativeOrders);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

module.exports = AdministrativeOrder;
