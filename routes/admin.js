var express = require('express');
var router = express.Router();
var User=require("./../models/baoming");

/* GET users listing. */
router.get('/', function(req, res, next) {

  User.fetch(function(err, users){
    if(err){
      console.log(err)
    } 
    console.log(123456+users)
    res.render('pages/admin', { 
      title: '报名' ,
      layout:'index',
      persons: users
    });
  })
 
});

module.exports = router;
