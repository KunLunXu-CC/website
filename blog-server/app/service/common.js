
// 获取下拉项 options
module.exports.options = async ({ ctx, model }) => {
  const server = ctx.db.mongo[model];
  const data = await server.find({});
  return data;
}
