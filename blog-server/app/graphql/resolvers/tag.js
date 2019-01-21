const mongoModel = require('../../db').getMongoModel();

module.exports = {
  Tag: {
    parent: async (parents, args, context, info) => {
      let data = {};
      if (parents._id){
        data = await mongoModel.Tag.findOne({
          _id: parents.parent
        });
      }
      return data;
    },
  },

  Query: {
    getTag: async (parents, args, context, info) => {
      const data = await mongoModel.Tag.find();
      return data;
    },
  },

  Mutation: {
    createTag: async (parents, args, context, info) => {
      const body = args.body;
      await mongoModel.Tag.insertMany({
        ...body,
        creator: "创建人先写死",
        updater: "更新人先写死(创建时加的)",
      });
      const data = await mongoModel.Tag.find();
      return data;
    }
  }
};
