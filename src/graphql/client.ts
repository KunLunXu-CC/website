import { GraphQLClient, ClientError } from "graphql-request";
import { createApi, BaseQueryFn } from "@reduxjs/toolkit/query/react";

// see: https://github.com/prisma-labs/graphql-request
const client = new GraphQLClient("http://localhost:3000/api/graphql", {
  mode: "cors",
  credentials: "include",
});

export default client;
