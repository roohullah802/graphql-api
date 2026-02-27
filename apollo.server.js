import { ApolloServer } from "@apollo/server";
import { baseTypeDefs } from "./src/baseDefs.js";
import { userTypeDefs } from "./src/user/user.schema.js";
import { mergeResolvers } from "@graphql-tools/merge";
import { userResolvers } from "./src/user/user.resolvers.js";
import { productResolvers } from "./src/products/product.resolvers.js";
import { productTypeDefs } from "./src/products/product.schema.js";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";

const startApolloServer = async () => {
  const server = new ApolloServer({
    typeDefs: [baseTypeDefs, userTypeDefs, productTypeDefs],
    resolvers: mergeResolvers([userResolvers, productResolvers]),
    introspection: true,
    csrfPrevention: false,
    plugins: [
      ApolloServerPluginLandingPageLocalDefault({
        embed: true,
      }),
    ],
  });

  await server.start();
  return server;
};

export default startApolloServer;
