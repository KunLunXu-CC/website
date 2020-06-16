
import axios from '@utils/request';

// 创建片段
export const createSnippet = async ({
  spin,
  body,
} = {}) => {
  const res = await axios({
    spin,
    url: GLOBAL_SERVICE.GRAPHQL_URL,
    method: 'post',
    data: {
      variables: { body: [body] },
      query: `
        mutation(
          $body: [SnippetFields!]!,
        ){
          createSnippets(
            body: $body,
          ){
            change {
              id
              content
              tags
            }
          }
        }`,
    },
  });
  return _.get(res, 'data.data.createSnippets') || {};
};

// 创建面试题
export const createInterview = async ({
  spin,
  body,
} = {}) => {
  const res = await axios({
    spin,
    url: GLOBAL_SERVICE.GRAPHQL_URL,
    method: 'post',
    data: {
      variables: { body: [body] },
      query: `
        mutation(
          $body: [InterviewFields!]!,
        ){
          createInterviews(
            body: $body,
          ){
            change {
              id
              content
              tags
            }
          }
        }`,
    },
  });
  return _.get(res, 'data.data.createInterviews') || {};
};


// 创建算法题
export const createAlgorithm = async ({
  spin,
  body,
} = {}) => {
  const res = await axios({
    spin,
    url: GLOBAL_SERVICE.GRAPHQL_URL,
    method: 'post',
    data: {
      variables: { body: [body] },
      query: `
        mutation(
          $body: [AlgorithmFields!]!,
        ){
          createAlgorithms(
            body: $body,
          ){
            change {
              id
              content
              tags
            }
          }
        }`,
    },
  });
  return _.get(res, 'data.data.createAlgorithms') || {};
};

/**
 * 获取片段
 * @return {Objject[]} 返回查询到的列表数据
 */
export const getSnippets = async ({ search, spin }) => {
  const res = await axios({
    spin,
    url: GLOBAL_SERVICE.GRAPHQL_URL,
    method: 'post',
    data: {
      variables: { search },
      query: `
        query($search: SnippetSearch){
          snippets(search: $search){
            list {
              id
              tags
              content
            }
          }
        }`,
    },
  });
  return _.get(res, 'data.data.snippets.list') || [];
};

/**
 * 获取面试题
 * @return {Objject[]} 返回查询到的列表数据
 */
export const getInterviews = async ({ search, spin }) => {
  const res = await axios({
    spin,
    url: GLOBAL_SERVICE.GRAPHQL_URL,
    method: 'post',
    data: {
      variables: { search },
      query: `
        query($search: InterviewSearch){
          interviews(search: $search){
            list {
              id
              tags
              content
            }
          }
        }`,
    },
  });
  return _.get(res, 'data.data.interviews.list') || [];
};

/**
 * 获取算法题
 * @return {Objject[]} 返回查询到的列表数据
 */
export const getAlgorithms = async ({ search, spin }) => {
  const res = await axios({
    spin,
    url: GLOBAL_SERVICE.GRAPHQL_URL,
    method: 'post',
    data: {
      variables: { search },
      query: `
        query($search: AlgorithmSearch){
          algorithm(search: $search){
            list {
              id
              tags
              content
            }
          }
        }`,
    },
  });
  return _.get(res, 'data.data.algorithm.list') || [];
};
