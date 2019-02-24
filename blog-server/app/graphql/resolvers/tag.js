const tagServer = require('../../service/tag');
module.exports = {
  Tag: {
    parent: async (parents, args, context, info) => {
      if (parents.parent){
        const data = await tagServer.findOne({ 
          parents: { id: parents.parent },
          ctx: context.ctx
        });
        return data.data;
      } else { return {}; }
    },
  },

  Query: {
    tagList: async (parents, args, context, info) => {
      return await tagServer.getList({...args, ctx: context.ctx});
    },
  },

  Mutation: {
    createTags: async (parents, args, context, info) => {
      return await tagServer.create({...args, ctx: context.ctx});
    },
    removeTags: async (parents, args, context, info) => {
      return await tagServer.remove({...args, ctx: context.ctx});
    },
    updateTags: async (parents, args, context, info) => {
      return await tagServer.update({...args, ctx: context.ctx});
    },
  }
};
