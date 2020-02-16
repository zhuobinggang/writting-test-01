function getGrade(score){
  return score < 60 ? 'C' : score < 80 ? 'B' : 'A';
};
// 学⽣及其成绩
let students = [
  {name: '张三', score: 84},
  {name: '李四', score: 58},
  {name: '王五', score: 99},
  {name: '赵六', score: 69}
];

const addIn = (groups, grade, student) => {
  if(groups[grade] == null){
    groups[grade] = [student]
  }else{
    groups[grade].push(student)
  }
}

const groupBy = (students) => {
  const groups = {}
  students.forEach(s => {
    addIn(groups, getGrade(s.score), s)
  })
  return groups;
}

module.exports = {
  groupBy, students
}