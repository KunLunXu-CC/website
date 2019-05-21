const { findOne, getList, create, remove, update } = require('../../service/common');
const { creator, updater } = require('./fragment');

module.exports = {
  Tag: {
    creator, 
    updater,
    parent: async (parents, args, context, info) => {
      if (parents.parent){
        const data = await findOne({
          model: 'Tag',
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
      return await getList({ model: 'Tag', ...args, ctx: context.ctx });
    },
  },

  Mutation: {
    createTags: async (parents, args, context, info) => {
      return await create({ model: 'Tag', ...args, ctx: context.ctx });
    },
    removeTags: async (parents, args, context, info) => {
      return await remove({ model: 'Tag', ...args, ctx: context.ctx });
    },
    updateTags: async (parents, args, context, info) => {
      return await update({ model: 'Tag', ...args, ctx: context.ctx });
    },
  }
};
