import { GraphQLClient, ClientError } from "graphql-request";

// see: https://github.com/prisma-labs/graphql-request
const client = new GraphQLClient("http://localhost:3000/api/graphql", {
  mode: "cors",
  credentials: "include",
});

export default client;
