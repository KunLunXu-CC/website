// vscode(Apollo GraphQL) 插件配置
// see: https://marketplace.visualstudio.com/items?itemName=apollographql.vscode-apollo
// see: https://www.apollographql.com/docs/devtools/editor-plugins/
// TODO: vscode(Apollo GraphQL) 插件研究, 过下上面两个链接
module.exports = {
  client: {
    service: {
      name: 'graphql server',
      localSchemaFile: `${__dirname}/.introspection.json`,
    },
    includes: ['./src/**/*.graphql'],
  },
};
