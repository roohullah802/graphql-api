import { GraphQLError } from "graphql";

export function throwGraphQLError(message, code, statusCode) {
  throw new GraphQLError(message, {
    extensions: {
      code: code,
      http: { status: statusCode },
    },
  });
}
