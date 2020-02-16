let tree = {
 id: '1',
 label: 'first',
 children: [ 
   { id: '2', label: 'second' },
   { id: '3', label: 'third', children: [
     { id: '4', label: 'fourth' },
     { id: '5', label: 'fifth' }
   ]}
  ]
};

const findNodeById = (root, id) => {
  let target = null;
  let shouldStop = false;

  const dps = (root, id) => {
    if(shouldStop){
      //Do nothing
    }else{
      if(root.id == id){//Finded
        target = root;
        shouldStop = true;
      }else if(root.children != null){//Have childs
        root.children.forEach(child => {
          dps(child, id)
        })
      }else{
        //Do nothing
      }
    }
  }

  dps(root, id)

  if(target != null){
    return target
  }else{
    throw "Bad id"
  }
};

module.exports = {
  findNodeById,
  tree,
};