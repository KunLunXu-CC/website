const articleServer = require('../../service/article');
module.exports = {
  Mutation: {
    createArticles: async (parents, args, context, info) => {
      return await articleServer.createArticles({...args, ctx: context.ctx});
    }
  }
}
