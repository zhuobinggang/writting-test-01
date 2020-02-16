
function dfsSetHash(srcName, node, hash){
  const [name, num] = node.name.split('_') 
  if(name == srcName){
    const id = num || 0;
    hash[id] = 1;
  }
  if(node.children != null){
    node.children.map(child => {
      dfsSetHash(srcName, child, hash)
    })
  }
}


function getIncName(srcName, rootTreeNode){
  const hash = [];
  dfsSetHash(srcName, rootTreeNode, hash);
  for(let i = 0;i< hash.length;i++){
    if(hash[i] == null){
      hash[i] = 1;
      if(i == 0){
        return srcName
      }else{
        return [srcName, i].join('_')
      }
    }
  }
  return [srcName, hash.length].join('_')
}

let mockTree = {
 id: '1',
 type: 'View',
 name: 'view',
 children: [
 {
 id: '2',
 type: 'Button',
 name: 'button_3'
 },
 {
 id: '3',
 type: 'View',
 name: 'view_1',
 children: [
 {
 id: '4',
 type: 'Button',
 name: 'button_1'
 },
 {
 id: '5',
 type: 'View',
 name: 'view_2'
 }
 ]
 }
 ]
};


module.exports = {
  getIncName, mockTree
}