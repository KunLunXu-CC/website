import { isArray, set, isPlainObject } from "lodash";
import { GraphQLClient, RequestMiddleware } from "graphql-request";

// 判断是否是可提取的文件
const isExtractableFile = <ValueType>(value: ValueType) => {
  return (
    (typeof File !== "undefined" && value instanceof File) ||
    (typeof Blob !== "undefined" && value instanceof Blob) ||
    (typeof Buffer !== "undefined" && value instanceof Buffer) ||
    (typeof value === `object` &&
      value !== null &&
      `pipe` in value &&
      typeof value.pipe === `function`)
  );
};

// 递归提取文件
const recursiveExtractFiles = (
  variableKey: string,
  variableValue: any,
  prefix: string,
): any => {
  // 1. 如果是文件，直接返回
  if (isExtractableFile(variableValue)) {
    return [
      {
        variableKey: [`${prefix}.${variableKey}`],
        file: variableValue,
      },
    ];
  }

  // 2. 如果是数组，且数组中的每一项都是文件, 则返回
  if (
    isArray(variableValue) &&
    variableValue.every((item) => isExtractableFile(item))
  ) {
    return variableValue.map((file, fileIndex) => {
      return {
        variableKey: [`${prefix}.${variableKey}.${fileIndex}`],
        file,
      };
    });
  }

  // 3. 如果是对象, 递归处理
  if (isPlainObject(variableValue)) {
    const ggg = Object.entries(variableValue).flatMap(([key, value]: any) =>
      recursiveExtractFiles(key, value, `${prefix}.${variableKey}`),
    );

    return ggg;
  }

  return [];
};

// 请求中间件
export const requestMiddleware: RequestMiddleware = async (request) => {
  const files = Object.entries(request.variables || {}).flatMap(
    ([variableKey, variableValue]) => {
      return recursiveExtractFiles(variableKey, variableValue, "variables");
    },
  );

  if (!files.length) {
    return request;
  }

  const form = new FormData();
  const parsedBody = JSON.parse(request.body as string);

  for (const file of files) {
    //remove file here to reduce request size
    set(parsedBody, file.variableKey[0], null);
  }

  form.append("operations", JSON.stringify(parsedBody));

  const map = files.reduce((accumulator, { variableKey }, index) => {
    return {
      ...accumulator,
      [index.toString()]: variableKey,
    };
  }, {});

  form.append("map", JSON.stringify(map));

  for (let index = 0; index < files.length; index++) {
    const file = files[index];
    form.append(index.toString(), file.file);
  }

  const { "Content-Type": _, ...newHeaders } = request.headers as Record<
    string,
    string
  >;

  return {
    ...request,
    body: form,
    headers: newHeaders,
  };
};

// see: https://github.com/prisma-labs/graphql-request
const client = new GraphQLClient(
  `${process.env.NEXT_PUBLIC_BLACK_URL}/api/graphql`,
  {
    mode: "cors",
    credentials: "include",
    requestMiddleware, // 中间件
  },
);

export default client;
