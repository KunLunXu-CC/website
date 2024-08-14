/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query Photos($search: PhotoSearch) {\n    photos(search: $search) {\n      list {\n        id\n        type\n        name\n      }\n    }\n  }\n": types.PhotosDocument,
    "\n  mutation RemovePhotos($conds: PhotoSearch!, $search: PhotoSearch) {\n    removePhotos(\n      conds: $conds\n      search: $search\n      orderBy: { creationTime: -1 }\n    ) {\n      change {\n        id\n      }\n    }\n  }\n": types.RemovePhotosDocument,
    "\n  mutation uploadPhotos($body: PhotoFields!) {\n    uploadPhotos(body: $body) {\n      change {\n        id\n        type\n        name\n      }\n    }\n  }\n": types.UploadPhotosDocument,
    "\n  fragment UserItem on User {\n    id\n    sex\n    bio\n    name\n    avatar\n    account\n    role {\n      id\n      desc\n      auth\n      name\n    }\n  }\n": types.UserItemFragmentDoc,
    "\n  query UserInfo {\n    userInfo {\n      user {\n        ...UserItem\n      }\n      message\n    }\n  }\n": types.UserInfoDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Photos($search: PhotoSearch) {\n    photos(search: $search) {\n      list {\n        id\n        type\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query Photos($search: PhotoSearch) {\n    photos(search: $search) {\n      list {\n        id\n        type\n        name\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemovePhotos($conds: PhotoSearch!, $search: PhotoSearch) {\n    removePhotos(\n      conds: $conds\n      search: $search\n      orderBy: { creationTime: -1 }\n    ) {\n      change {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation RemovePhotos($conds: PhotoSearch!, $search: PhotoSearch) {\n    removePhotos(\n      conds: $conds\n      search: $search\n      orderBy: { creationTime: -1 }\n    ) {\n      change {\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation uploadPhotos($body: PhotoFields!) {\n    uploadPhotos(body: $body) {\n      change {\n        id\n        type\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation uploadPhotos($body: PhotoFields!) {\n    uploadPhotos(body: $body) {\n      change {\n        id\n        type\n        name\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment UserItem on User {\n    id\n    sex\n    bio\n    name\n    avatar\n    account\n    role {\n      id\n      desc\n      auth\n      name\n    }\n  }\n"): (typeof documents)["\n  fragment UserItem on User {\n    id\n    sex\n    bio\n    name\n    avatar\n    account\n    role {\n      id\n      desc\n      auth\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query UserInfo {\n    userInfo {\n      user {\n        ...UserItem\n      }\n      message\n    }\n  }\n"): (typeof documents)["\n  query UserInfo {\n    userInfo {\n      user {\n        ...UserItem\n      }\n      message\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;