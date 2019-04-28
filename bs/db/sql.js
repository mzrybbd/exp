module.exports = {
  user: {
    add: 'insert into user (uname,upwd,role) values (?,?,?)',
    addTeacher: 'insert into user (uname,upwd,role) values (?,?,2)',
    check: 'select * from user where uname=?',
    delete: 'delete from stu where uname=?',
    all: 'select * from user'
  },
  stu: {
    add: 'insert into stu (sno,sname,cname,avatar,sex) values (?,?,?,?,?)',
    delete: 'delete from stu where sno=?',
    check: 'select * from stu where sno=?',
    all: 'select * from stu'
  },
  teacher: {
    add1: 'insert into teacher (tno,tname,avatar,sex,email,phone,address) values (?,?,?,?,?,?,?)',
    add: 'insert into teacher (tno,tname) values (?,?)',
    check: 'select * from teacher where tno=?',
    all: 'select * from teacher'
  },
  class: {
    all: 'select * from class'
  },

}