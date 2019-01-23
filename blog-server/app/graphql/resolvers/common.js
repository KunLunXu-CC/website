const { GraphQLScalarType } = require('graphql');
module.exports = {
  // 待测试
  // Date: new GraphQLScalarType({
  //   name: 'Date',
  //   description: 'Date custom scalar type',
  //   // 来自前端的值
  //   parseValue(value) {
  //     return new Date(value);
  //   },
  //   // 发送给前端的值
  //   serialize(value) {
  //     return '1111111111111';
  //     return value.getTime();
  //   },
  //   parseLiteral(ast) {
  //     if (ast.kind === Kind.INT) {
  //       return new Date(ast.value);
  //     }
  //     return null;
  //   },
  // })
}; 
