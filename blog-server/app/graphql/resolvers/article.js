const {getList, create, remove, update } = require('../../service/common');

module.exports = {
  Query: {
    aticleList: async (parents, args, context, info) => {
      return await getList({ ...args, ctx: context.ctx });
    },
  },

  Mutation: {
    createArticles: async (parents, args, context, info) => {
      return await create({ model: 'Article', ...args, ctx: context.ctx });
    },
    removeArticles: async (parents, args, context, info) => {
      return await remove({ model: 'Article', ...args, ctx: context.ctx });
    },
    updateArticles: async (parents, args, context, info) => {
      return await update({ model: 'Article',...args, ctx: context.ctx });
    },
  },
  
  Article: {
    tags: async (parents, args, context, info) => {
      if (parents.tags){
        const data = await getList({
          mode: 'Tag',
          ctx: context.ctx, 
          params: {ids: parents.tags}
        });
        return data.list;
      } else {
        return [];
      }
    },
  }
}
