import { GraphQLClient, ClientError } from 'graphql-request';
import { createApi, BaseQueryFn } from '@reduxjs/toolkit/query/react';

// see: https://github.com/prisma-labs/graphql-request
export const client = new GraphQLClient(GRAPHQL_URL, {
  mode: 'cors',
  credentials: 'include',
});

const graphqlBaseQuery: BaseQueryFn = async ({ document, variables }) => {
  try {
    const { data } = await client.rawRequest(document, variables);
    return { data };
  } catch (error) {
    if (error instanceof ClientError) {
      return { error: { status: error.response.status, data: error } };
    }

    return { error: { status: 500, data: error } };
  }
};

export const api = createApi({
  endpoints: () => ({}),
  reducerPath: 'graphql',
  baseQuery: graphqlBaseQuery,
});
