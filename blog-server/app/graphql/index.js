const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const { mapFiles } = require('../utils/helper');

const { 
  gql,
  ApolloServer, 
  mergeSchemas, 
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

module.exports = (app) => {
  const typeDefs = getTypeDefs();
  const resolvers = getResolves();
  const server = new ApolloServer({
    typeDefs: gql`${typeDefs}`,
	  resolvers: resolvers,
    context: ({ req, ctx }) => ({ ctx })
  });
  server.applyMiddleware({ app, path: '/specialUrl' });
}
