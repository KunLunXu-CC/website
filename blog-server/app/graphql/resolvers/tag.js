const {findOne, getList, create, remove, update} = require('../../service/common');

module.exports = {
  Tag: {
    parent: async (parents, args, context, info) => {
      if (parents.parent){
        const data = await findOne({ 
          parents: { id: parents.parent },
          ctx: context.ctx
        });
        return data.data;
      } else { 
        return {}; 
      }
    },
  },

  Query: {
    tagList: async (parents, args, context, info) => {
      return await getList({...args, ctx: context.ctx});
    },
  },

  Mutation: {
    createTags: async (parents, args, context, info) => {
      return await create({...args, ctx: context.ctx});
    },
    removeTags: async (parents, args, context, info) => {
      return await remove({...args, ctx: context.ctx});
    },
    updateTags: async (parents, args, context, info) => {
      return await update({...args, ctx: context.ctx});
    },
  }
};
