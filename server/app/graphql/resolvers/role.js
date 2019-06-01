const { getList, create, remove, update, findOne  } = require('../../service/common');
const { creator, updater } = require('./fragment');

module.exports = {
  Query: {
    roleList: async (parents, args, context, info) => {
      return await getList({ model: 'Role', ...args, ctx: context.ctx });
    },
  },

  Mutation: {
    createRoles: async (parents, args, context, info) => {
      return await create({ model: 'Role', ...args, ctx: context.ctx });
    },
    removeRoles: async (parents, args, context, info) => {
      return await remove({ model: 'Role', ...args, ctx: context.ctx });
    },
    updateRoles: async (parents, args, context, info) => {
      return await update({ model: 'Role', ...args, ctx: context.ctx });
    },
  },

  Role: { creator, updater }
}
