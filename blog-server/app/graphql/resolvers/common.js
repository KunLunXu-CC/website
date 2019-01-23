const { GraphQLScalarType } = require('graphql');
module.exports = {
  // 待测试
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date类型值',
    parseValue(value) {
      // 请求入参值
      return 'Date类型值结构暂时不知道干嘛用';
    },
    serialize(value) {
      // 发起请求后获取到的值
      return new Date(value);
    },
    parseLiteral(ast) {
      // 解析请求参数值
      return new Date(ast.value);
    },
  })
}; 
