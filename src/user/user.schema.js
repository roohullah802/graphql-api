import GraphQLUpload from "graphql-upload/GraphQLUpload.mjs";

export const userTypeDefs = `#graphql

scalar Upload


type File {
  fileId: ID!
  name: String!
  url: String!
  thumbnailUrl: String!
  height: Int!
  width: Int!
  fileType: String!
}

type User{
    name:String!
    email: String!
    password: String
}

type Query{
    getAllUsers: [User]
}

type Mutation{
    createUser(name: String!, email: String!, password: String!): String!
    loginUser(email: String!, password: String!): String!
    uploadImage(file: Upload!): File!
}
`;
