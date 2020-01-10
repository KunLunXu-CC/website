import axios from '@utils/request';

export const getNotes = async ({
  spin,
  search,
  pagination,
} = {}) => {
  const res = await axios({
    spin,
    url: GLOBAL_SERVICE.GRAPHQL_URL,
    method: 'post',
    data: {
      variables: { search, pagination },
      query: `
        query(
          $search: NoteSearch,
          $pagination: Pagination,
        ){
          notes(
            search: $search,
            pagination: $pagination,
            orderBy: { creationTime: -1 },
          ){
            list {
              id
              name
              desc
              thumb
              content
              tags { id name }
            }
            message
            pagination
          }
        }`,
    },
  });
  return res.data.data.notes;
};

export const removeNotes = async () => {};
