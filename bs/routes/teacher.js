var express = require('express');
var router = express.Router();
var db = require('../db/config');
var sql = require("../db/sql");
router.post('/all', function (req, res) {
    db.query(sql.teacher.all, []).then(function ([err, results]) {
        if (err) {
            db.json(res, { type: 0, msg: "查询教师列表失败" })
        }
        else {
            db.json(res, { type: 1, msg: "查询教师列表成功", data: results })
        }
    }).catch(function (err) {
        throw err
    })
})
router.post('/allClass', function (req, res) {
  db.query(sql.class.all, []).then(function ([err, results]) {
    if (err) {
        db.json(res, { type: 0, msg: "查询班级列表失败" })
    }
    else {
        db.json(res, { type: 1, msg: "查询班级列表成功", data: results })
    }
  }).catch(function (err) {
    throw err
  })
})
module.exports = router