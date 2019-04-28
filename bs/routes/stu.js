var express = require('express');
var router = express.Router();
var db = require('../db/config');
var sql = require("../db/sql");
router.post('/all', function (req, res) {
  db.query(sql.stu.all, []).then(function ([err, results]) {
      if (err) {
          db.json(res, { type: 0, msg: "查询学生列表失败" })
      }
      else {
          db.json(res, { type: 1, msg: "查询学生列表成功", data: results })
      }
  }).catch(function (err) {
      throw err
  })
})
module.exports = router