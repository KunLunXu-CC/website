const articleServer = require('../../service/article');
const tagServer = require('../../service/tag');

module.exports = {
  Query: {
    aticleList: async (parents, args, context, info) => {
      return await articleServer.getList({ ...args, ctx: context.ctx });
    },
  },

  Mutation: {
    createArticles: async (parents, args, context, info) => {
      return await articleServer.create({ ...args, ctx: context.ctx });
    },
    removeArticles: async (parents, args, context, info) => {
      return await articleServer.remove({ ...args, ctx: context.ctx });
    },
    updateArticles: async (parents, args, context, info) => {
      return await articleServer.update({ ...args, ctx: context.ctx });
    },
  },
  
  Article: {
    tags: async (parents, args, context, info) => {
      if (parents.tags){
        const data = await tagServer.getList({
          ctx: context.ctx, 
          params: {ids: parents.tags}
        });
        return data.list;
      }
      return [];
    },
  }
}
