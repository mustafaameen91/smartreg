const {
   prismaErrorHandling,
   prismaInstance,
} = require("./../middleware/handleError.middleware.js");

const User = function (user) {
   this.userName = user.userName;
   this.password = user.password;
   this.roleId = user.roleId;
   this.sectionId = user.sectionId;
};

User.create = async (newUser, result) => {
   try {
      const user = await prismaInstance.user.create({
         data: newUser,
      });

      result(null, user);
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

User.findById = async (userId, result) => {
   try {
      const singleUser = await prismaInstance.user.findUnique({
         where: {
            idUser: JSON.parse(userId),
         },
      });

      if (singleUser) {
         result(null, singleUser);
      } else {
         result({
            error: "Not Found",
            code: 404,
            errorMessage: "Not Found User with this Id",
         });
      }
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

User.loginUser = async (username, password, result) => {
   console.log(username);
   console.log(password);

   try {
      const singleUser = await prismaInstance.user.findFirst({
         where: {
            userName: username,
            password: password,
         },
      });

      if (singleUser) {
         result(null, singleUser);
      } else {
         result({
            error: "Not Found",
            code: 404,
            errorMessage: "Not Found User with this Id",
         });
      }
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

User.getAll = async (result) => {
   try {
      const users = await prismaInstance.user.findMany();
      result(null, users);
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

User.updateById = async (userId, user, result) => {
   try {
      const updateUser = await prismaInstance.user.update({
         where: { idUser: JSON.parse(userId) },
         data: user,
      });
      result(null, updateUser);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

User.remove = async (id, result) => {
   try {
      const deleteUser = await prismaInstance.user.delete({
         where: { idUser: JSON.parse(id) },
      });
      result(null, deleteUser);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

User.removeAll = async (result) => {
   try {
      const deleteAllUser = await prismaInstance.user.deleteMany({});
      result(null, deleteAllUser);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

module.exports = User;
