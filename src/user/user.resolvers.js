import GraphQLUpload from "graphql-upload/GraphQLUpload.mjs";
import UserService from "./service/user.service.js";

export const userResolvers = {
  Upload: GraphQLUpload,
  Query: {
    getAllUsers: async (_, args, context) =>
      await UserService.getAllUsers(context),
  },
  Mutation: {
    createUser: async () => await UserService.createUser(),
    loginUser: async (_, args, context) =>
      await UserService.loginUser(args, context),
    uploadImage: async (_, args) => await UserService.saveImage(args),
  },
};
