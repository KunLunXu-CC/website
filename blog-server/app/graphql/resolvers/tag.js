const tagServer = require('../../service/tag');

module.exports = {
  Tag: {
    parent: async (parents, args, context, info) => {
      if (parents._id){
        return await tagServer.findOne({ id: parents.parent,  ctx: context.ctx});;
      } else { return {}; }
    },
  },

  Query: {
    tagList: async (parents, args, context, info) => {
      return await tagServer.getTagList({...args, ctx: context.ctx});
    },
  },

  Mutation: {
    createTags: async (parents, args, context, info) => {
      return await tagServer.createTags({...args, ctx: context.ctx});
    },
    removeTagByIds: async (parents, args, context, info) => {
      return await tagServer.removeTagByIds({...args, ctx: context.ctx});
    },
    updateTagByIds: async (parents, args, context, info) => {
      return await tagServer.updateTagByIds({...args, ctx: context.ctx});
    },
  }
};
