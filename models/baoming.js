var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userScheMa = new Schema({
	persons:{
		name: String,
		enterDate: String,
		college: String,
		major: String,
		phoneNumber: String,
		email: String,
		job: String,
		meta:{
			createAt:{
				type: Date,
				default: Date.now()
			},
			updateAt:{
				type : Date,
				default : Date.now()
			}
		}
  	}
})

userScheMa.pre('save',function(next){
	if(this.isNew){
		this.persons.meta.createAt=Date.now()
		this.persons.meta.updateAt=Date.now()
	}else{
		this.persons.meta.updateAt= Date.now()
	}

	//调用next(),使存储流程走完
	next()
})

userScheMa.statics= {
	fetch:function(cb){
		return this
			.find({})
			.sort('meta.updateAt')
			.exec(cb)
	},
	findById:function(id,cb){
		return this
			.findOne({_id:id})
			.exec(cb)
	}
}

var user=mongoose.model('users', userScheMa)

module.exports=user