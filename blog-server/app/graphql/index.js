const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const system = require('../../config/system');
const { mapFiles } = require('../utils/helper');

const { 
  gql,
  ApolloServer, 
} = require('apollo-server-koa');

/**
 * 获取结构器并进行合并
 */
function getResolves(){
  const resolves = mapFiles(path.resolve(__dirname, './resolvers'));
  const mergeResolves = _.merge(..._.values(resolves));
  return mergeResolves;
}

/**
 * 获取 typeDefs 并进行合并
 */
function getTypeDefs(){
  let typeDefs = '';
  const pathUrl = path.resolve(__dirname, './schemas');

  const [dirs, files] = _.partition(fs.readdirSync(pathUrl), p => {
    return fs.statSync(path.join(pathUrl, p)).isDirectory();
  });

  files.forEach( file => {
    if (path.extname(file) === '.graphql'){
      typeDefs += fs.readFileSync(path.join(pathUrl, file), 'utf8');
    }
  });
  return typeDefs;
}

/**
 * 上下文配置
 */
function context({req, ctx}){
  return {ctx};
}

/**
 * 错误屏蔽和记录
 */
function formatError(app, error){
  return {message: error.message};
}

module.exports = (app) => {
  const server = new ApolloServer({
    typeDefs: gql`${getTypeDefs()}`,
    resolvers: getResolves(),
    context: context,
    formatError: formatError.bind(null, app)
  });

  server.applyMiddleware({ app, path: system.graphql.path });
}
