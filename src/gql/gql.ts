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
    "\n  mutation AlbumRemove($conds: PhotoSearch!, $search: PhotoSearch) {\n    removePhotos(conds: $conds, search: $search) {\n      change {\n        id\n      }\n    }\n  }\n": types.AlbumRemoveDocument,
    "\n  fragment AlbumPhotoItem on Photo {\n    id\n    type\n    name\n    creationTime\n  }\n": types.AlbumPhotoItemFragmentDoc,
    "\n  query AlbumSearch {\n    photos(orderBy: { creationTime: -1 }) {\n      list {\n        ...AlbumPhotoItem\n      }\n    }\n  }\n": types.AlbumSearchDocument,
    "\n  mutation AlbumUpload($body: PhotoFields!) {\n    uploadPhotos(body: $body) {\n      change {\n        ...AlbumPhotoItem\n      }\n    }\n  }\n": types.AlbumUploadDocument,
    "\n  mutation CreateDiaries($body: [DiaryFields!]!) {\n    createDiaries(body: $body) {\n      change {\n        ...DiaryItem\n      }\n    }\n  }\n": types.CreateDiariesDocument,
    "\n  mutation UpdateDiaries($body: DiaryFields!, $conds: DiarySearch!) {\n    updateDiaries(body: $body, conds: $conds) {\n      change {\n        ...DiaryItem\n      }\n    }\n  }\n": types.UpdateDiariesDocument,
    "\n  fragment DiaryItem on Diary {\n    id\n    name\n    getUp\n    toRest\n    informalEssay\n    diet {\n      type\n      desc\n    }\n    fitness {\n      type\n      place\n    }\n    bill {\n      tag\n      desc\n      income\n      expend\n    }\n    bodyIndex {\n      bim\n      weight\n      muscle\n      bodyfat\n      moistureContent\n    }\n  }\n": types.DiaryItemFragmentDoc,
    "\n  query CalendarDiaries($search: DiarySearch) {\n    diaries(search: $search) {\n      list {\n        ...DiaryItem\n      }\n    }\n  }\n": types.CalendarDiariesDocument,
    "\n  query DiaryStatsBill($search: StatsBillSearch) {\n    statsBill(search: $search) {\n      stats {\n        income\n        expend\n      }\n      groupWithName {\n        name\n        income\n        expend\n        diaries {\n          name\n          bill {\n            desc\n            income\n            expend\n            tag\n          }\n        }\n      }\n    }\n  }\n": types.DiaryStatsBillDocument,
    "\n  fragment RoleItem on Role {\n    id\n    name\n    auth\n  }\n": types.RoleItemFragmentDoc,
    "\n  query Roles {\n    roles {\n      list {\n        ...RoleItem\n      }\n    }\n  }\n": types.RolesDocument,
    "\n  mutation UpdateRoles($body: RoleFields!, $conds: RoleSearch!) {\n    updateRoles(body: $body, conds: $conds) {\n      change {\n        ...RoleItem\n      }\n    }\n  }\n": types.UpdateRolesDocument,
    "\n  query Users {\n    users {\n      list {\n        ...UserItem\n      }\n    }\n  }\n": types.UsersDocument,
    "\n  mutation UpdateUsers($body: UserFields!, $conds: UserSearch!) {\n    updateUsers(body: $body, conds: $conds) {\n      message\n      change {\n        ...UserItem\n      }\n    }\n  }\n": types.UpdateUsersDocument,
    "\n  query Photos($search: PhotoSearch) {\n    photos(search: $search) {\n      list {\n        id\n        type\n        name\n      }\n    }\n  }\n": types.PhotosDocument,
    "\n  mutation RemovePhotos($conds: PhotoSearch!, $search: PhotoSearch) {\n    removePhotos(\n      conds: $conds\n      search: $search\n      orderBy: { creationTime: -1 }\n    ) {\n      change {\n        id\n      }\n    }\n  }\n": types.RemovePhotosDocument,
    "\n  mutation uploadPhotos($body: PhotoFields!) {\n    uploadPhotos(body: $body) {\n      change {\n        id\n        type\n        name\n      }\n    }\n  }\n": types.UploadPhotosDocument,
    "\n  fragment UserItem on User {\n    id\n    sex\n    bio\n    name\n    avatar\n    account\n    role {\n      id\n      desc\n      auth\n      name\n    }\n  }\n": types.UserItemFragmentDoc,
    "\n  query PublicKey {\n    publicKey {\n      data\n    }\n  }\n": types.PublicKeyDocument,
    "\n  query UserInfo {\n    userInfo {\n      user {\n        ...UserItem\n      }\n      message\n    }\n  }\n": types.UserInfoDocument,
    "\n  mutation login($account: String, $password: String) {\n    login(account: $account, password: $password) {\n      user {\n        ...UserItem\n      }\n      message\n    }\n  }\n": types.LoginDocument,
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
export function graphql(source: "\n  mutation AlbumRemove($conds: PhotoSearch!, $search: PhotoSearch) {\n    removePhotos(conds: $conds, search: $search) {\n      change {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation AlbumRemove($conds: PhotoSearch!, $search: PhotoSearch) {\n    removePhotos(conds: $conds, search: $search) {\n      change {\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment AlbumPhotoItem on Photo {\n    id\n    type\n    name\n    creationTime\n  }\n"): (typeof documents)["\n  fragment AlbumPhotoItem on Photo {\n    id\n    type\n    name\n    creationTime\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query AlbumSearch {\n    photos(orderBy: { creationTime: -1 }) {\n      list {\n        ...AlbumPhotoItem\n      }\n    }\n  }\n"): (typeof documents)["\n  query AlbumSearch {\n    photos(orderBy: { creationTime: -1 }) {\n      list {\n        ...AlbumPhotoItem\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AlbumUpload($body: PhotoFields!) {\n    uploadPhotos(body: $body) {\n      change {\n        ...AlbumPhotoItem\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation AlbumUpload($body: PhotoFields!) {\n    uploadPhotos(body: $body) {\n      change {\n        ...AlbumPhotoItem\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateDiaries($body: [DiaryFields!]!) {\n    createDiaries(body: $body) {\n      change {\n        ...DiaryItem\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateDiaries($body: [DiaryFields!]!) {\n    createDiaries(body: $body) {\n      change {\n        ...DiaryItem\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateDiaries($body: DiaryFields!, $conds: DiarySearch!) {\n    updateDiaries(body: $body, conds: $conds) {\n      change {\n        ...DiaryItem\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateDiaries($body: DiaryFields!, $conds: DiarySearch!) {\n    updateDiaries(body: $body, conds: $conds) {\n      change {\n        ...DiaryItem\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment DiaryItem on Diary {\n    id\n    name\n    getUp\n    toRest\n    informalEssay\n    diet {\n      type\n      desc\n    }\n    fitness {\n      type\n      place\n    }\n    bill {\n      tag\n      desc\n      income\n      expend\n    }\n    bodyIndex {\n      bim\n      weight\n      muscle\n      bodyfat\n      moistureContent\n    }\n  }\n"): (typeof documents)["\n  fragment DiaryItem on Diary {\n    id\n    name\n    getUp\n    toRest\n    informalEssay\n    diet {\n      type\n      desc\n    }\n    fitness {\n      type\n      place\n    }\n    bill {\n      tag\n      desc\n      income\n      expend\n    }\n    bodyIndex {\n      bim\n      weight\n      muscle\n      bodyfat\n      moistureContent\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query CalendarDiaries($search: DiarySearch) {\n    diaries(search: $search) {\n      list {\n        ...DiaryItem\n      }\n    }\n  }\n"): (typeof documents)["\n  query CalendarDiaries($search: DiarySearch) {\n    diaries(search: $search) {\n      list {\n        ...DiaryItem\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query DiaryStatsBill($search: StatsBillSearch) {\n    statsBill(search: $search) {\n      stats {\n        income\n        expend\n      }\n      groupWithName {\n        name\n        income\n        expend\n        diaries {\n          name\n          bill {\n            desc\n            income\n            expend\n            tag\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query DiaryStatsBill($search: StatsBillSearch) {\n    statsBill(search: $search) {\n      stats {\n        income\n        expend\n      }\n      groupWithName {\n        name\n        income\n        expend\n        diaries {\n          name\n          bill {\n            desc\n            income\n            expend\n            tag\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment RoleItem on Role {\n    id\n    name\n    auth\n  }\n"): (typeof documents)["\n  fragment RoleItem on Role {\n    id\n    name\n    auth\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Roles {\n    roles {\n      list {\n        ...RoleItem\n      }\n    }\n  }\n"): (typeof documents)["\n  query Roles {\n    roles {\n      list {\n        ...RoleItem\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateRoles($body: RoleFields!, $conds: RoleSearch!) {\n    updateRoles(body: $body, conds: $conds) {\n      change {\n        ...RoleItem\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateRoles($body: RoleFields!, $conds: RoleSearch!) {\n    updateRoles(body: $body, conds: $conds) {\n      change {\n        ...RoleItem\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Users {\n    users {\n      list {\n        ...UserItem\n      }\n    }\n  }\n"): (typeof documents)["\n  query Users {\n    users {\n      list {\n        ...UserItem\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateUsers($body: UserFields!, $conds: UserSearch!) {\n    updateUsers(body: $body, conds: $conds) {\n      message\n      change {\n        ...UserItem\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateUsers($body: UserFields!, $conds: UserSearch!) {\n    updateUsers(body: $body, conds: $conds) {\n      message\n      change {\n        ...UserItem\n      }\n    }\n  }\n"];
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
export function graphql(source: "\n  query PublicKey {\n    publicKey {\n      data\n    }\n  }\n"): (typeof documents)["\n  query PublicKey {\n    publicKey {\n      data\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query UserInfo {\n    userInfo {\n      user {\n        ...UserItem\n      }\n      message\n    }\n  }\n"): (typeof documents)["\n  query UserInfo {\n    userInfo {\n      user {\n        ...UserItem\n      }\n      message\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation login($account: String, $password: String) {\n    login(account: $account, password: $password) {\n      user {\n        ...UserItem\n      }\n      message\n    }\n  }\n"): (typeof documents)["\n  mutation login($account: String, $password: String) {\n    login(account: $account, password: $password) {\n      user {\n        ...UserItem\n      }\n      message\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;