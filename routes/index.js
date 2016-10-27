var express = require('express');
var router = express.Router();
var mongoose=require('mongoose')
var User=require("./../models/baoming");
var _= require('underscore')



/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('pages/index', { 
		title: '报名' ,
		layout:'index',
		persons:{
			name: '',
			enterDate: '',
			college: '',
			major: '',
			phoneNumber: '',
			email: '',
			job: ''
  		}
	});
});

//got success page

router.get('/success', function(req, res, next) {
	res.render('pages/success', { 
		title: '报名' ,
		layout:'index'
	});
});



router.get('/update/:id',function(req,res,next){
	var id=req.params.id

	if(id){
		User.findById(id, function(err,user){
			res.render('pages/index',{
				title: 'imooc 后台更新页',
				persons: user
			})
		})
	}
})

router.post('/new',function(req,res){
	//console.log("req.body"+req.body);

	var id = req.body.persons._id
	var userObj= req.body.persons;
	var _user

	console.log("id"+id)
	if (id !== '') {
		User.findById( id , function(err,user){
			if(err){
				console.log(err)
			}
			_user=_.extend(user, userObj)
			_user.save(function(err,user){
				if (err) {
					console.log(err)
				}
				res.redirect('/success?'+ user._id)
			})
		})
	}
	else{
		console.log(userObj)
		_user= new User({
			persons:{
				name: userObj.name,
				enterDate:  userObj.enterDate,
				college: userObj.college,
				major: userObj.major,
				phoneNumber: userObj.phoneNumber,
				email: userObj.email,
				job: userObj.job
	  		}
		})
		_user.save(function(err,user){
			if (err) {
				console.log(err)
			}
			console.log("saveUser"+user)
			res.redirect('/success?'+user._id)
		})
	}
})


module.exports = router;
