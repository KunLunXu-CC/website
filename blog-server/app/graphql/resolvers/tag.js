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
      return await tagServer.getTagList(args);
    },
  },

  Mutation: {
    createTag: async (parents, args, context, info) => {
      const body = args.body;
      await modelTag.insertMany({
        ...body,
        creator: "创建人先写死",
        updater: "更新人先写死(创建时加的)",
      });
      const data = await modelTag.find();
      return data;
    }
  }
};
