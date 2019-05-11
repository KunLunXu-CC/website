const roleServer = require('../../service/role');

module.exports = {
  Query: {
    roleList: async (parents, args, context, info) => {
      return await roleServer.getList({ ...args, ctx: context.ctx });
    },
  },

  Mutation: {
    createRoles: async (parents, args, context, info) => {
      return await roleServer.create({ ...args, ctx: context.ctx });
    },
    removeRoles: async (parents, args, context, info) => {
      return await roleServer.remove({ ...args, ctx: context.ctx });
    },
    updateRoles: async (parents, args, context, info) => {
      return await roleServer.update({ ...args, ctx: context.ctx });
    },
  },
}
