const { getList, create, remove, update, findOne  } = require('../../service/common');

module.exports = {
  Query: {
    userList: async (parents, args, context, info) => {
      return await getList({ model: 'User', ...args, ctx: context.ctx });
    },
  },

  Mutation: {
    createUsers: async (parents, args, context, info) => {
      return await create({ model: 'User', ...args, ctx: context.ctx });
    },
    removeUsers: async (parents, args, context, info) => { 
      return await remove({ model: 'User', ...args, ctx: context.ctx });
    },
    updateUsers: async (parents, args, context, info) => {
      return await update({ model: 'User', ...args, ctx: context.ctx });
    },
  },

  User: {
    role: async (parents, args, context, info) => {
      if (parents.role){
        const data = await findOne({ 
          model: 'Role', 
          ctx: context.ctx,
          params: { id: parents.role }
        });
        return data.data;
      } else {
        return {};
      }
    }
  }
}
