const { findNodeById, tree} = require('./findNodeById');
const {groupBy, students} = require('./groupBy')
const {parse, testCase} = require('./parse')
const {getIncName, mockTree} = require('./incId')

function test(){
  //0_TreeNode 查询
  console.log('-------------------');
  console.log('0_TreeNode 查询');
  console.log(findNodeById(tree, 5));
  console.log('-------------------');
  
  //4_学⽣按成绩分组
  console.log('4_学⽣按成绩分组');
  console.log(groupBy(students)); 
  console.log('-------------------');
  
  
  //2_字符串 Parse
  console.log('2_字符串 Parse');
  testCase.forEach(c => {
    console.log(parse(c))
  })
  console.log('-------------------');
  
  //7_自增ID
  console.log('7_自增ID');
  console.log(getIncName('button', mockTree))
  console.log('-------------------');
}


module.exports = {
  parse, getIncName, groupBy, findNodeById
}