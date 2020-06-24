
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
  return _.get(res, 'data.data.createSnippets.change') || [];
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
  return _.get(res, 'data.data.createInterviews.change') || [];
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
  return _.get(res, 'data.data.createAlgorithms.change') || [];
};

// 修改片段
export const updateSnippet = async ({
  spin,
  body,
  conds,
} = {}) => {
  const res = await axios({
    spin,
    url: GLOBAL_SERVICE.GRAPHQL_URL,
    method: 'post',
    data: {
      variables: { body, conds },
      query: `
        mutation(
          $body: SnippetFields!,
          $conds: SnippetSearch!
        ){
          updateSnippets(
            body: $body,
            conds: $conds,
          ){
            change {
              id
              tags
              content
            }
          }
        }`,
    },
  });
  return _.get(res, 'data.data.updateSnippets.change[0]') || {};
};

// 修改面试题
export const updateInterview = async ({
  spin,
  body,
  conds,
} = {}) => {
  const res = await axios({
    spin,
    url: GLOBAL_SERVICE.GRAPHQL_URL,
    method: 'post',
    data: {
      variables: { body, conds },
      query: `
        mutation(
          $body: InterviewFields!,
          $conds: InterviewSearch!
        ){
          updateInterviews(
            body: $body,
            conds: $conds,
          ){
            change {
              id
              tags
              content
            }
          }
        }`,
    },
  });
  return _.get(res, 'data.data.updateInterviews.change[0]') || {};
};


// 修改算法题
export const updateAlgorithm = async ({
  spin,
  body,
  conds,
} = {}) => {
  const res = await axios({
    spin,
    url: GLOBAL_SERVICE.GRAPHQL_URL,
    method: 'post',
    data: {
      variables: { body, conds },
      query: `
        mutation(
          $body: AlgorithmFields!,
          $conds: AlgorithmSearch!
        ){
          updateAlgorithms(
            body: $body,
            conds: $conds,
          ){
            change {
              id
              tags
              content
            }
          }
        }`,
    },
  });
  return _.get(res, 'data.data.updateAlgorithms.change[0]') || {};
};

// 修改片段
export const removeSnippet = async ({
  spin,
  conds,
} = {}) => {
  const res = await axios({
    spin,
    url: GLOBAL_SERVICE.GRAPHQL_URL,
    method: 'post',
    data: {
      variables: { conds },
      query: `
        mutation(
          $conds: SnippetSearch!
        ){
          removeSnippets(
            conds: $conds,
          ){
            change {
              id
              tags
              content
            }
          }
        }`,
    },
  });
  return _.get(res, 'data.data.removeSnippets.change[0]') || {};
};

// 修改面试题
export const removeInterview = async ({
  spin,
  conds,
} = {}) => {
  const res = await axios({
    spin,
    url: GLOBAL_SERVICE.GRAPHQL_URL,
    method: 'post',
    data: {
      variables: { conds },
      query: `
        mutation(
          $conds: InterviewSearch!
        ){
          removeInterviews(
            conds: $conds,
          ){
            change {
              id
              tags
              content
            }
          }
        }`,
    },
  });
  return _.get(res, 'data.data.removeInterviews.change[0]') || {};
};

// 修改算法题
export const removeAlgorithm = async ({
  spin,
  conds,
} = {}) => {
  const res = await axios({
    spin,
    url: GLOBAL_SERVICE.GRAPHQL_URL,
    method: 'post',
    data: {
      variables: { conds },
      query: `
        mutation(
          $conds: AlgorithmSearch!
        ){
          removeAlgorithms(
            conds: $conds,
          ){
            change {
              id
              tags
              content
            }
          }
        }`,
    },
  });
  return _.get(res, 'data.data.removeAlgorithms.change[0]') || {};
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
          algorithms(search: $search){
            list {
              id
              tags
              content
            }
          }
        }`,
    },
  });
  return _.get(res, 'data.data.algorithms.list') || [];
};
