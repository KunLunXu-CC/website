import { GraphQLClient, ClientError } from 'graphql-request';
import { createApi, BaseQueryFn } from '@reduxjs/toolkit/query/react';

// see: https://github.com/prisma-labs/graphql-request
export const client = new GraphQLClient('http://localhost:4000/graphql');

const graphqlBaseQuery: BaseQueryFn = async ({ document, variables }) => {
  try {
    // 1. 设置请求头 authorization: 身份认证
    const authorization = localStorage.getItem('authorization');

    if (authorization) {
      client.setHeader('authorization', authorization);
    }

    // 2. 请求接口
    const { data, headers } = await client.rawRequest(document, variables);

    // TODO: baseQuery 第二个参数能拿到 dispatch、state 等信息

    // 3. 存储响应头 authorization: 身份认证
    const newAuthorization = headers.get('authorization');

    if (newAuthorization) {
      localStorage.setItem('authorization', newAuthorization);
    }

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
