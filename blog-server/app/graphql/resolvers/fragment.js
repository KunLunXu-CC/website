const { findOne, getList, create, remove, update } = require('../../service/common');

module.exports = {
  creator: async (parents, args, context, info) => {
    if (parents.creator){
      const data = await findOne({
        model: 'User',
        parents: { id: parents.creator },
        ctx: context.ctx
      });
      return data.data;
    } else { 
      return {}; 
    }
  },

  updater: async (parents, args, context, info) => {
    if (parents.updater){
      const data = await findOne({
        model: 'User',
        parents: { id: parents.updater },
        ctx: context.ctx
      });
      return data.data;
    } else { 
      return {}; 
    }
  },
};
