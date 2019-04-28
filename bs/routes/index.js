var express = require('express');
var router = express.Router();
var db = require('../db/config');
var sql = require("../db/sql");
const random = require('../public/javascripts/random');
const crypto = require('crypto')
const Base64 = require('../public/javascripts/base64')
//注册
router.post('/register', function (req, res) {
  var params = req.body

  db.query(sql.user.add, [params.uid, params.pwd, params.role]).then(function ([err, results]) {
    if (err) {
      db.json(res, { type: 0, msg: "用户已存在" })
    }
    if(params.role == '管理员') {
      db.json(res, { type: 1, msg: "注册成功", data: { id: results.insertId } })
    }
  }).then(function() {
  	if(params.role == '学生'){
	  	db.query(sql.stu.add, [params.uid, params.uname, params.cname, params.avatar, params.sex]).then(function ([err, results]) {
	      if (err) {
	      	db.query(sql.user.delete, [params.uid])
	        db.json(res, { type: 0, msg: "注册失败" })
	      }
	      else {
	      	db.json(res, { type: 1, msg: "注册成功", data: { id: results.insertId } })
	      }
	    })
	  }
    if(params.role == '教师') {
	    db.query(sql.teacher.add, [ params.uid, params.uname ]).then(function([err, results]) {
	    	if (err) {
	    		db.query(sql.user.delete, [params.uid])
	        db.json(res, { type: 0, msg: "注册失败" })
	    	}
	    	else {
	    		db.json(res, { type: 1, msg: "注册成功", data: { id: results.insertId } })
	    	}
	    })
    }
  }).catch(function (err) {
    throw err
  }) 
})

//登录
router.post('/login', function (req, res) {
  var params = req.body

  db.query(sql.user.check, [params.uid]).then(function ([err, results]) {
    if (err) {
      db.json(res, { type: 0, msg: "查询失败" })
    }
    if (results.length === 0) {
      db.json(res, { type: 0, msg: "用户名不存在" })
    }
    db.json(res, { type: 1, msg: "查询用户成功", data: results[0] })
  }).catch(function (err) {
    throw err
  })
})
router.post('/class',function(req,res,next) {
  db.query(sql.class.all).then(function([err,results]){
    if(err) {
      db.json(res,{type:0, msg:"查询失败"})
    }
    else {
      db.json(res,{type:1, msg:"查询成功", data:results})
    }
  }).catch(function(err) {
    throw err
  })
})
router.post('/all', function (req, res) {
  db.query(sql.user.all, []).then(function ([err, results]) {
    if (err) {
        db.json(res, { type: 0, msg: "查询用户列表失败" })
    }
    else {
        db.json(res, { type: 1, msg: "查询用户列表成功", data: results })
    }
  }).catch(function (err) {
    throw err
  })
})
module.exports = router;
