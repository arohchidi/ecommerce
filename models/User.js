var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var bcrypt = require('bcrypt');
var userSchema = new Schema({
     //define fields
    username:{
        type:String,
        required:[true, 'please provide your username'],
        
    },
    email:{
        type:String,
       required:[true, 'please provide your email'],
       
    },
    password:{
     type:String,
        required:[false, 'please provide your password'],
        unique:false,
    }, 
    totalAmount:{
        type:Number,
        default:0,
    },
    role:{
        type:String,
        default:'user'
    }
   
  

    
    })
userSchema.pre('save', function(next){
    
    const user = this
    bcrypt.hash(user.password, 10, function(error, encrypted){
        
        user.password = encrypted
        next()
    })
    
})
module.exports = mongoose.model('User', userSchema);