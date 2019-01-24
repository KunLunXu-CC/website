const mongoose = require('mongoose');
const modelTag = mongoose.model('Tag');

const tagServer = require('../../service/tag');

module.exports = {
  Tag: {
    parent: async (parents, args, context, info) => {
      if (parents._id){
        return await modelTag.findOne({ _id: parents.parent });
      } else { return {}; }
    },
  },

  Query: {
    getTagList: async (parents, args, context, info) => {
      return await tagServer.getTagList({...args, ctx: context.ctx});
    },
  },

  Mutation: {
    createTags: async (parents, args, context, info) => {
      return await tagServer.createTags({...args, ctx: context.ctx});
    },
    updateTags: async (parents, args, context, info) => {
      return await tagServer.updateTags({...args, ctx: context.ctx});
    },
  }
};
