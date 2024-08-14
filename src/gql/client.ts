import { GraphQLClient } from "graphql-request";

// see: https://github.com/prisma-labs/graphql-request
const client = new GraphQLClient(
  `${process.env.NEXT_PUBLIC_BLACK_URL}/api/graphql`,
  {
    mode: "cors",
    credentials: "include",
  },
);

export default client;
