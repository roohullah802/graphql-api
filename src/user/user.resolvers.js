import GraphQLUpload from "graphql-upload/GraphQLUpload.mjs";
import UserService from "./service/user.service.js";

export const userResolvers = {
  Upload: GraphQLUpload,
  Query: {
    getAllUsers: async () => await UserService.getAllUsers(),
  },
  Mutation: {
    createUser: async (_, args) => await UserService.createUser(args),
    loginUser: async (_, args, { res }) =>
      await UserService.loginUser(args, res),
    uploadImage: async (_, { file }) => await UserService.uploadImage(file),
  },
};
