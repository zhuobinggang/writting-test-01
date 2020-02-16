
//// TESTED START
const cut = (str, cutStart, cutEnd) => {
  return str.substr(0,cutStart) + str.substr(cutEnd+1);
}

const findPairEnd = (str, start) => {
  let stack = 1;
  //To find the end
  for(let i = start+1; i<str.length; i++){
    if(str[i] == '<'){
      stack += 1;
    }else if(str[i] == '>'){
      stack -= 1;
      if(stack == 0){
        return i;
      }
    }
  }
  throw "No pair end!"
}

const deleteAllPairs =(str) =>{
  const start = str.search('<')
  if(start != -1){
    let end = findPairEnd(str, start)
    return deleteAllPairs(cut(str, start, end))
  }else{
    return str
  }
}

const memoriseDeleteAllPairs = (() => {//Memorise
  let dict = { }
  return (str) => {
    if(dict[str] == null){
      dict[str] = deleteAllPairs(str)
    }
    return dict[str]
  }
})();

const trim = (str) =>{
  return str.trim()
}

const firstCompositeType = (str) => { //Find first type in the 'a, b', return finded part and the rest
  const firstComma = str.search(',')
  const firstLT = str.search('<')

  if(firstComma == -1 && firstLT == -1){
    return [str.trim()]
  }else if(firstComma != -1 && firstLT == -1){
    return [str.slice(0, firstComma).trim(), str.slice(firstComma + 1).trim()]
  }else if(firstComma == -1 && firstLT != -1){
    return [str.trim()]
  }else if(firstComma != -1 && firstLT != -1){
    if(firstComma < firstLT){
      return [str.slice(0, firstComma).trim(), str.slice(firstComma + 1).trim()]
    }else if(firstLT < firstComma){
      const end = findPairEnd(str,firstLT);
      const first = str.slice(0, end+1).trim();
      const restWithoutComma = (() => {
        const rest = str.slice(end + 1);
        const theComma = rest.search(',')
        return rest.slice(theComma+1).trim()
      })();
      return [first, restWithoutComma]
    }
  }
}

const splitedCompositeTypes = (str) => {
  const result = []

  let [type, rest] = firstCompositeType(str)
  result.push(type)

  while(rest != null && rest != ''){
    [type, rest] = firstCompositeType(rest)
    result.push(type)
  }
  return result
}

const isCompositeType = (str) => {
  return splitedCompositeTypes(str).length > 1
}

const isPrimitiveType = (str) => {
  return ['int','string','bool'].includes(str);
}

const isCollectioinType = (str) => {
  return str.search('<') != -1
}

const collectionType = (str) => {
  return memoriseDeleteAllPairs(str)
}
////TESTED END







const collectionInnerTypes = (str) => {
  const start = str.search('<')
  const end = findPairEnd(str, start)
  return parse(str.slice(start + 1, end))
}

const parse = (str) => {
  str = str.trim();
  if(isCompositeType(str)){//Pattern 1: composite type like 'a, b'
    //return a list
    const splitedTypes = splitedCompositeTypes(str)
    return splitedTypes.map(parse)
  }else{//Pattern 2: integrated type like 'a'
    if(isPrimitiveType(str)){//Pattern 2.1: primitive type like 'int'
      return {type: str}
    }else if(isCollectioinType(str)){//Pattern 2.2: Collection type like 'Array<?>'
      return {
        type: collectionType(str),
        typeArgs: collectionInnerTypes(str),
      }
    }
  }
}

const testCase = [
  "Map<Map<string, bool>, bool>", 
  "Map<string, Map<string, bool>>", 
  "Array<Array<Array<int>>>",
  "Array<Array<int>>",
  "Array<int>",
  "bool",
  "string",
  "int"
]

module.exports = {
  parse, testCase
}